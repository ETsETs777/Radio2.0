const Database = require('better-sqlite3')

const db = new Database('database.db', { verbose: console.log })
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    wallet REAL DEFAULT 0.0
  );
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL,
    image TEXT,
    category TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    total_price REAL NOT NULL,
    status TEXT DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    price REAL NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
  );
`)

const productCount = db.prepare('SELECT COUNT(*) as count FROM products').get().count
if (productCount === 0) {
  const insert = db.prepare(`
    INSERT INTO products (name, description, price, image, category) 
    VALUES (?, ?, ?, ?, ?)
  `)

  const products = [
    {
      name: 'Ардуино Уно R3',
      description: 'Микроконтроллерная плата на базе ATmega328P',
      price: 1200,
      image: 'https://example.com/arduino.jpg',
      category: 'Микроконтроллеры'
    },
    {
      name: 'Raspberry Pi 4 Model B 4GB',
      description: 'Одноплатный компьютер с 4 ГБ оперативной памяти',
      price: 6500,
      image: 'https://example.com/raspberry.jpg',
      category: 'Одноплатные компьютеры'
    },
    {
      name: 'Паяльник 60W',
      description: 'Паяльник с регулировкой температуры',
      price: 1500,
      image: 'https://example.com/soldering.jpg',
      category: 'Инструменты'
    },
    {
      name: 'Набор резисторов 500 шт',
      description: 'Набор резисторов различных номиналов',
      price: 300,
      image: 'https://example.com/resistors.jpg',
      category: 'Компоненты'
    },
    {
      name: 'Мультиметр DT-830B',
      description: 'Цифровой мультиметр с базовыми функциями',
      price: 800,
      image: 'https://example.com/multimeter.jpg',
      category: 'Измерительные приборы'
    },
    {
      "name": "Arduino Uno R3",
      "description": "Популярная плата для начинающих и профи",
      "price": 1200,
      "image": "https://www.oldi.ru/image/cache/products/104675_1-600x600.jpg",
      "category": "Микроконтроллеры"
    },
    {
        "name": "Raspberry Pi 4 Model B 8GB",
        "description": "Одноплатный компьютер с 8 ГБ оперативной памяти",
        "price": 8900,
        "image": "https://www.oldi.ru/image/cache/products/136139_1-600x600.jpg",
        "category": "Одноплатные компьютеры"
    },
      {
        "name": "ESP32 DevKit V1",
        "description": "Wi-Fi и Bluetooth модуль для IoT проектов",
        "price": 890,
        "image": "https://www.oldi.ru/image/cache/products/120514_1-600x600.jpg",
        "category": "Модули связи"
      },
      {
        "name": "DS18B20 Датчик температуры",
        "description": "Цифровой датчик температуры с интерфейсом 1-Wire",
        "price": 150,
        "image": "https://radiodetali.ru/upload/iblock/e5c/e5c8e1f7a5d2e3b7e7f6d1c6a3e4d8f2.jpg",
        "category": "Датчики"
      },
      {
        "name": "HC-SR04 Ультразвуковой датчик",
        "description": "Измеритель расстояния до 4 метров",
        "price": 250,
        "image": "https://radiodetali.ru/upload/iblock/f1a/f1a2e3f5a4d1c3e6d2e1f7a5d2e3b7e7.jpg",
        "category": "Датчики"
      },
      {
        "name": "LCD1602 с I2C адаптером",
        "description": "ЖК-дисплей 16x2 символа с модулем I2C",
        "price": 350,
        "image": "https://www.oldi.ru/image/cache/products/115285_1-600x600.jpg",
        "category": "Дисплеи"
      },
      {
        "name": "Светодиод RGB 5мм",
        "description": "Многоцветный светодиод с общим анодом",
        "price": 20,
        "image": "https://radiodetali.ru/upload/iblock/d41/d41f1e2a5d3c4b6e7f1a2e3d5f6c7b8a.jpg",
        "category": "Компоненты"
      },
      {
        "name": "Реле 5В 1 канал",
        "description": "Одноканальное реле для коммутации нагрузки",
        "price": 120,
        "image": "https://www.oldi.ru/image/cache/products/108237_1-600x600.jpg",
        "category": "Электромеханика"
      },
      {
        "name": "Драйвер L298N",
        "description": "Драйвер двигателей постоянного тока",
        "price": 400,
        "image": "https://www.oldi.ru/image/cache/products/108332_1-600x600.jpg",
        "category": "Моторы и драйверы"
      },
      {
        "name": "Li-Ion аккумулятор 18650",
        "description": "Перезаряжаемый литиевый аккумулятор 3.7В",
        "price": 250,
        "image": "https://radiodetali.ru/upload/iblock/1c0/1c0a5e7d2f3c1b4e8a6f1c0d5e2b7a9f.jpg",
        "category": "Источники питания"
      },
      {
        "name": "Мультиметр DT-830B",
        "description": "Цифровой мультиметр с базовыми функциями",
        "price": 800,
        "image": "https://radiodetali.ru/upload/iblock/4f4/4f41a3c1d2e5f6b7a4c8d9e0f1a2b3c4.jpg",
        "category": "Измерительные приборы"
      },
      {
        "name": "Паяльник 60W",
        "description": "Паяльник с регулировкой температуры",
        "price": 1500,
        "image": "https://www.oldi.ru/image/cache/products/111563_1-600x600.jpg",
        "category": "Инструменты"
      },
      {
        "name": "Набор отверток SL/PH",
        "description": "Комплект мини-отверток для электроники",
        "price": 300,
        "image": "https://www.oldi.ru/image/cache/products/111563_1-600x600.jpg",
        "category": "Инструменты"
      },
      {
        "name": "Транзистор 2N2222",
        "description": "NPN биполярный транзистор",
        "price": 15,
        "image": "https://radiodetali.ru/upload/iblock/7d7/7d7e1f2a5c3b4d6e8f1a2c5d4e3b7a9f.jpg",
        "category": "Компоненты"
      },
      {
        "name": "Конденсатор электролитический 100мкФ",
        "description": "Конденсатор полярный на 16В",
        "price": 25,
        "image": "https://radiodetali.ru/upload/iblock/8c8/8c8e1f2a5c3b4d6e8f1a2c5d4e3b7a9f.jpg",
        "category": "Компоненты"
      },
      {
        "name": "Резистор 1 кОм 0.25 Вт",
        "description": "Углеродный резистор",
        "price": 5,
        "image": "https://radiodetali.ru/upload/iblock/a1a/a1a2e3f5a4d1c3e6d2e1f7a5d2e3b7e7.jpg",
        "category": "Компоненты"
      },
      {
        "name": "USB to TTL конвертер CH340",
        "description": "Адаптер для программирования Arduino Mini",
        "price": 300,
        "image": "https://www.oldi.ru/image/cache/products/111563_1-600x600.jpg",
        "category": "Модули связи"
      },
      {
        "name": "Модуль SD-карты",
        "description": "Модуль для чтения данных с SD карт",
        "price": 400,
        "image": "https://radiodetali.ru/upload/iblock/c3c/c3c8e1f7a5d2e3b7e7f6d1c6a3e4d8f2.jpg",
        "category": "Хранение данных"
      },
      {
        "name": "Модуль RTC DS3231",
        "description": "Часы реального времени с питанием от батарейки",
        "price": 350,
        "image": "https://radiodetali.ru/upload/iblock/d5d/d5d8e1f7a5d2e3b7e7f6d1c6a3e4d8f2.jpg",
        "category": "Модули"
      },
      {
        "name": "Микросхема AT24C32",
        "description": "EEPROM память 32Кбит",
        "price": 100,
        "image": "https://radiodetali.ru/upload/iblock/e6e/e6e8e1f7a5d2e3b7e7f6d1c6a3e4d8f2.jpg",
        "category": "Компоненты"
      },
      {
        "name": "Датчик движения HC-SR501",
        "description": "Пироэлектрический датчик движения",
        "price": 200,
        "image": "https://radiodetali.ru/upload/iblock/f7f/f7f8e1f7a5d2e3b7e7f6d1c6a3e4d8f2.jpg",
        "category": "Датчики"
      },
      {
        "name": "Модуль микрофона KY-038",
        "description": "Аналоговый и цифровой выход звука",
        "price": 150,
        "image": "https://radiodetali.ru/upload/iblock/0a0/0a08e1f7a5d2e3b7e7f6d1c6a3e4d8f2.jpg",
        "category": "Модули"
      },
      {
        "name": "Модуль вибрации KY-002",
        "description": "Модуль обнаружения вибрации",
        "price": 120,
        "image": "https://radiodetali.ru/upload/iblock/1b1/1b18e1f7a5d2e3b7e7f6d1c6a3e4d8f2.jpg",
        "category": "Модули"
      },
      {
        "name": "Модуль управления сервоприводами PCA9685",
        "description": "Широтно-импульсная модуляция для 16 сервоприводов",
        "price": 500,
        "image": "https://www.oldi.ru/image/cache/products/120514_1-600x600.jpg",
        "category": "Модули"
      },
      {
        "name": "Гироскоп MPU6050",
        "description": "Модуль измерения угла наклона и вращения",
        "price": 300,
        "image": "https://radiodetali.ru/upload/iblock/2c2/2c28e1f7a5d2e3b7e7f6d1c6a3e4d8f2.jpg",
        "category": "Датчики"
      },
      {
        "name": "Датчик света GL5528",
        "description": "Фоторезистор для определения уровня освещенности",
        "price": 80,
        "image": "https://radiodetali.ru/upload/iblock/3d3/3d38e1f7a5d2e3b7e7f6d1c6a3e4d8f2.jpg",
        "category": "Датчики"
      },
      {
        "name": "Датчик давления BMP180",
        "description": "Модуль измерения давления и температуры",
        "price": 450,
        "image": "https://radiodetali.ru/upload/iblock/4e4/4e48e1f7a5d2e3b7e7f6d1c6a3e4d8f2.jpg",
        "category": "Датчики"
      },
      {
        "name": "Датчик газа MQ-2",
        "description": "Датчик детектирования газа, дыма и пара",
        "price": 200,
        "image": "https://radiodetali.ru/upload/iblock/5f5/5f58e1f7a5d2e3b7e7f6d1c6a3e4d8f2.jpg",
        "category": "Датчики"
      },
      {
        "name": "Модуль NFC RC522",
        "description": "Чтение и запись RFID-карт формата 13.56 МГц",
        "price": 400,
        "image": "https://radiodetali.ru/upload/iblock/6a6/6a68e1f7a5d2e3b7e7f6d1c6a3e4d8f2.jpg",
        "category": "Модули связи"
      },
      {
        "name": "Датчик цвета TCS3200",
        "description": "Модуль определения цвета объектов",
        "price": 600,
        "image": "https://radiodetali.ru/upload/iblock/7b7/7b78e1f7a5d2e3b7e7f6d1c6a3e4d8f2.jpg",
        "category": "Датчики"
      },
      {
        "name": "Датчик влажности DHT11",
        "description": "Цифровой датчик температуры и влажности",
        "price": 180,
        "image": "https://radiodetali.ru/upload/iblock/8c8/8c88e1f7a5d2e3b7e7f6d1c6a3e4d8f2.jpg",
        "category": "Датчики"
      },
      {
        "name": "Модуль Wi-Fi ESP-01",
        "description": "Мини модуль Wi-Fi для подключения к сети",
        "price": 350,
        "image": "https://www.oldi.ru/image/cache/products/120514_1-600x600.jpg",
        "category": "Модули связи"
      },
      {
        "name": "Модуль GPS NEO-6M",
        "description": "GPS приемник для определения координат",
        "price": 1200,
        "image": "https://radiodetali.ru/upload/iblock/9d9/9d98e1f7a5d2e3b7e7f6d1c6a3e4d8f2.jpg",
        "category": "Модули связи"
      },
      {
        "name": "Модуль Bluetooth HC-05",
        "description": "Модуль беспроводной передачи данных по Bluetooth",
        "price": 450,
        "image": "https://radiodetali.ru/upload/iblock/a1a/a1a8e1f7a5d2e3b7e7f6d1c6a3e4d8f2.jpg",
        "category": "Модули связи"
      },
      {
        "name": "Модуль LoRa SX1278",
        "description": "Модуль дальней связи на основе технологии LoRa",
        "price": 700,
        "image": "https://radiodetali.ru/upload/iblock/b2b/b2b8e1f7a5d2e3b7e7f6d1c6a3e4d8f2.jpg",
        "category": "Модули связи"
      },
      {
        "name": "Модуль GSM SIM800L",
        "description": "GSM модуль для отправки SMS и голосовых вызовов",
        "price": 1200,
        "image": "https://radiodetali.ru/upload/iblock/c3c/c3c8e1f7a5d2e3b7e7f6d1c6a3e4d8f2.jpg",
        "category": "Модули связи"
      },
      {
        "name": "Модуль ZigBee XBee",
        "description": "Модуль беспроводной связи стандарта ZigBee",
        "price": 1500,
        "image": "https://radiodetali.ru/upload/iblock/d4d/d4d8e1f7a5d2e3b7e7f6d1c6a3e4d8f2.jpg",
        "category": "Модули связи"
      },
      {
        "name": "Модуль CAN MCP2515",
        "description": "Контроллер шины CAN для автомобильных систем",
        "price": 500,
        "image": "https://radiodetali.ru/upload/iblock/e5e/e5e8e1f7a5d2e3b7e7f6d1c6a3e4d8f2.jpg",
        "category": "Модули"
      },
      {
        "name": "Модуль IR-приемника VS1838B",
        "description": "Приемник инфракрасного сигнала",
        "price": 100,
        "image": "https://radiodetali.ru/upload/iblock/f6f/f6f8e1f7a5d2e3b7e7f6d1c6a3e4d8f2.jpg",
        "category": "Модули"
      },
      {
        "name": "Модуль MAX7219 для светодиодных матриц",
        "description": "Драйвер управления 8x8 светодиодными матрицами",
        "price": 300,
        "image": "https://radiodetali.ru/upload/iblock/0a0/0a08e1f7a5d2e3b7e7f6d1c6a3e4d8f2.jpg",
        "category": "Модули"
      }
    ]

  const insertMany = db.transaction((products) => {
    for (const product of products) {
      insert.run(
        product.name,
        product.description,
        product.price,
        product.image,
        product.category
      )
    }
  })

  insertMany(products)
}

module.exports = db