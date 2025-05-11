const express = require('express');
const cors = require('cors');
const db = require('./db');
const bcrypt = require('bcrypt');
const session = require('express-session');

const app = express();
const PORT = 3001;
app.use(session({
  secret: 'ваш_секретный_ключ',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, 
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7, 
    sameSite: 'lax', 
    domain: 'localhost' 
  }
}));

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  exposedHeaders: ['set-cookie'] 
}));

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.session.cart = req.session.cart || [];
  next();
});

app.post('/api/auth/register', async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Не все поля заполнены' });
  }

  const userExists = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  if (userExists) {
    return res.status(400).json({ error: 'Пользователь уже существует' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const stmt = db.prepare(`
    INSERT INTO users (username, email, password)
    VALUES (?, ?, ?)
  `);
  stmt.run(username, email, hashedPassword);

  res.json({ success: true, message: 'Регистрация успешна' });
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Неверные логин или пароль' });
  }

  req.session.user = {
    id: user.id,
    username: user.username,
    email: user.email,
    wallet: user.wallet
  };

  res.json({ success: true, user: req.session.user });
});

app.get('/api/auth/me', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Пользователь не авторизован' });
  }
  res.json(req.session.user);
});

app.post('/api/auth/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ error: 'Ошибка выхода' });
    res.json({ success: true });
  });
});

app.get('/api/wallet', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Требуется авторизация' });
  }

  const user = db.prepare('SELECT wallet FROM users WHERE id = ?').get(req.session.user.id);
  res.json({ wallet: user.wallet });
});

app.post('/api/wallet/add', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Требуется авторизация' });
  }

  const { amount } = req.body;

  if (!amount || isNaN(amount) || Number(amount) <= 0) {
    return res.status(400).json({ error: 'Укажите корректную сумму' });
  }

  const userId = req.session.user.id;

  db.prepare(`UPDATE users SET wallet = wallet + ? WHERE id = ?`).run(Number(amount), userId);

  const updatedUser = db.prepare('SELECT id, username, email, wallet FROM users WHERE id = ?').get(userId);

  req.session.user = {
    ...req.session.user,
    wallet: updatedUser.wallet
  };

  res.json({ wallet: updatedUser.wallet });
});

app.get('/api/products', (req, res) => {
  const products = db.prepare('SELECT * FROM products').all();
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Товар не найден' });
  }
});

app.post('/api/products', (req, res) => {
  try {
    const { name, description, price, category, image } = req.body;

    if (!name || !description || !price || !category) {
      return res.status(400).json({ error: "Не все поля заполнены!" });
    }

    const stmt = db.prepare(`
      INSERT INTO products (name, description, price, category, image)
      VALUES (?, ?, ?, ?, ?)
    `);

    const result = stmt.run(name, description, price, category, image || null);

    res.json({
      success: true,
      productId: result.lastInsertRowid,
      message: "Товар успешно добавлен!"
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/cart', (req, res) => {
  res.json(req.session.cart);
});

app.post('/api/cart/add', (req, res) => {
  const { productId, quantity = 1 } = req.body;

  if (!productId || quantity < 1) {
    return res.status(400).json({ error: 'Неверные данные' });
  }

  const product = db.prepare('SELECT id, name, price, image FROM products WHERE id = ?').get(productId);
  if (!product) {
    return res.status(404).json({ error: 'Товар не найден' });
  }

  const existingItem = req.session.cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    req.session.cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity
    });
  }

  res.json(req.session.cart);
});

app.post('/api/cart/remove', (req, res) => {
  const { productId } = req.body;

  req.session.cart = req.session.cart.filter(item => item.id !== productId);
  res.json(req.session.cart);
});

app.post('/api/cart/update', (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId || quantity < 1) {
    return res.status(400).json({ error: 'Неверное количество' });
  }

  const item = req.session.cart.find(item => item.id === productId);
  if (item) {
    item.quantity = quantity;
  }

  res.json(req.session.cart);
});

app.post('/api/orders', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Для оформления заказа необходимо войти' });
  }

  const { items } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Корзина пуста' });
  }

  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const insertOrder = db.prepare(`
    INSERT INTO orders (customer_name, customer_email, customer_phone, total_price)
    VALUES (?, ?, ?, ?)
  `).run(
    req.session.user.username,
    req.session.user.email,
    "Не указано",
    totalPrice
  );

  const orderId = insertOrder.lastInsertRowid;

  const insertItem = db.prepare(`
    INSERT INTO order_items (order_id, product_id, quantity, price)
    VALUES (?, ?, ?, ?)
  `);

  for (const item of items) {
    insertItem.run(orderId, item.product_id, item.quantity, item.price);
  }

  req.session.cart = [];

  res.json({
    success: true,
    orderId,
    totalPrice
  });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});