// Получение корзины (для гостей тоже)
app.get('/api/cart', (req, res) => {
  req.session.cart = req.session.cart || [];
  res.json(req.session.cart);
});

// Добавление товара в корзину
app.post('/api/cart/add', (req, res) => {
  const { productId, quantity = 1 } = req.body;

  if (!productId || quantity < 1) {
    return res.status(400).json({ error: 'Неверные данные' });
  }

  const product = db.prepare('SELECT id, name, price, image FROM products WHERE id = ?').get(productId);
  if (!product) {
    return res.status(404).json({ error: 'Товар не найден' });
  }

  req.session.cart = req.session.cart || [];

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