require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const port = 5000;
const crypto = require('crypto');

const app = express();
const BOT_TOKEN = process.env.BOT_TOKEN;
if (!BOT_TOKEN) {
  throw new Error('Токен Telegram не указан! Проверьте файл .env.');
}

// Проверка авторизации
const checkAuth = (data) => {
  const { hash, ...params } = data;
  const sortedKeys = Object.keys(params).sort();
  const stringToHash = sortedKeys.map((key) => `${key}=${params[key]}`).join('\n');
  const secretKey = crypto.createHash('sha256').update(BOT_TOKEN).digest();
  const calculatedHash = crypto.createHmac('sha256', secretKey).update(stringToHash).digest('hex');

  return calculatedHash === hash;
};

app.get('/auth', (req, res) => {
  const data = req.query;

  if (checkAuth(data)) {
    res.send(`Добро пожаловать, ${data.first_name}`);
  } else {
    res.status(403).send('Ошибка авторизации');
  }
});

app.listen(3000, () => console.log('Сервер запущен на порту 3000'));

app.use(express.json());

// Путь к файлу ads.json
const adsFilePath = path.join(__dirname, 'src/assets/ads.json');

// Указываем папку для хранения статических файлов
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));

// Чтение существующих объявлений
const getAds = () => {
  if (fs.existsSync(adsFilePath)) {
    const data = fs.readFileSync(adsFilePath);
    return JSON.parse(data);
  }
  return [];
};

// Функция для записи объявлений в файл
const saveAds = (ads) => {
  fs.writeFileSync(adsFilePath, JSON.stringify(ads, null, 2));
};

// Функция для форматирования цены
const formatPrice = (price) => {
  return price
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' руб.'; // Добавление пробела и рубля
};

// Настройка хранилища для изображений
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadsDir = path.join(__dirname, 'public', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    // Получение данных из запроса
    const { type, brand, model, year } = req.body;

    // Генерация уникального суффикса
    const uniqueSuffix = Math.round(Math.random() * 1e9);

    // Формирование имени файла
    const formattedType = type?.replace(/\s+/g, '_') || 'unknown';
    const formattedBrand = brand?.replace(/\s+/g, '_') || 'unknown';
    const formattedModel = model?.replace(/\s+/g, '_') || 'unknown';
    const formattedYear = year || 'unknown';
    const extension = path.extname(file.originalname); // Получаем расширение файла

    // Итоговое имя файла
    const fileName = `${formattedType} ${formattedBrand} ${formattedModel} ${formattedYear} ${uniqueSuffix}${extension}`;
    cb(null, fileName);
  }
});

// Экспорт хранилища для использования с multer
const upload = multer({ storage });
module.exports = upload;

// Маршрут для получения всех объявлений
app.get('/api/ads', (req, res) => {
  const ads = getAds().map(ad => {
    const currentDate = new Date();
    const adDate = new Date(ad.date);
    const daysRemaining = 30 - Math.floor((currentDate - adDate) / (10000000 * 60 * 60 * 24));
    
    ad.price = formatPrice(ad.price);
    ad.daysRemaining = daysRemaining > 0 ? daysRemaining : 0; // Добавляем оставшиеся дни до удаления

    return ad;
  });

  res.json(ads);
});

// Маршрут для добавления нового объявления
app.post('/api/ads', upload.array('photos'), (req, res) => {
  let newAd = req.body;

  // Преобразуем цену в числовой формат
  newAd.price = parseFloat(newAd.price.replace(/,/g, ''));

  // Генерация ID для нового объявления
  const ads = getAds();
  const newId = ads.length > 0 ? ads[ads.length - 1].id + 1 : 1;
  newAd.id = newId;

  // Сохранение путей к загруженным фотографиям
  if (req.files && req.files.length > 0) {
    newAd.photos = req.files.map(file => `/uploads/${file.filename}`);
    newAd.imageUrl = newAd.photos[0];
  } else {
    newAd.imageUrl = 'assets/images/default.jpg';
  }

  // Проверка обязательных полей
  if (!newAd.title || !newAd.price || !newAd.description || !newAd.brand || !newAd.model || !newAd.year || !newAd.category) {
    return res.status(400).json({ error: 'Все поля обязательны!' });
  }
  
  // Устанавливаем дополнительные данные
  newAd.date = newAd.date || new Date().toLocaleString();
  newAd.views = newAd.views || 0;
  newAd.utilityFee = req.body.utilityFee || "Не указано"; // Добавляем новый параметр для утильсбора

  // Сохраняем объявление
  ads.push(newAd);
  saveAds(ads);
  
  // Форматируем цену перед отправкой
  newAd.price = formatPrice(newAd.price);

  res.status(201).json(newAd);
});

// Маршрут для увеличения количества просмотров
app.post('/api/ads/:id/view', (req, res) => {
  const adId = parseInt(req.params.id, 10);
  const ads = getAds();
  const ad = ads.find((ad) => ad.id === adId);

  if (!ad) {
    return res.status(404).json({ error: 'Объявление не найдено' });
  }

  ad.views += 1;
  saveAds(ads);

  res.json(ad);
});

// Маршрут для получения одного объявления
app.get('/api/ads/:id', (req, res) => {
  const adId = parseInt(req.params.id, 10);
  const ads = getAds();
  const ad = ads.find(ad => ad.id === adId);

  if (!ad) {
    return res.status(404).json({ error: 'Объявление не найдено' });
  }

  res.json(ad);
});

// Маршрут для получения объявлений по категории
app.get('/api/ads/category/:category', (req, res) => {
  const category = req.params.category;
  const ads = getAds().filter(ad => ad.category.toLowerCase().trim() === category.toLowerCase().trim());

  if (ads.length === 0) {
    return res.status(404).json({ error: 'Объявления не найдены для этой категории' });
  }

  const formattedAds = ads.map(ad => {
    const currentDate = new Date();
    const adDate = new Date(ad.date);
    const daysRemaining = 30 - Math.floor((currentDate - adDate) / (1000 * 60 * 60 * 24));
    
    ad.price = formatPrice(ad.price);
    ad.daysRemaining = daysRemaining > 0 ? daysRemaining : 0; // Добавляем оставшиеся дни до удаления

    return ad;
  });

  res.json(formattedAds);
});

// Функция удаления объявлений старше 30 дней
const removeOldAds = () => {
  const ads = getAds();
  const currentDate = new Date();
  const updatedAds = ads.filter(ad => {
    const adDate = new Date(ad.date);
    return (currentDate - adDate) / (1000 * 60 * 60 * 24) <= 30; // Условие: не старше 30 дней
  });

  if (updatedAds.length !== ads.length) {
    saveAds(updatedAds);
    console.log('Удалены старые объявления.');
  }
};

// Периодическое удаление старых объявлений (каждые 24 часа)
setInterval(removeOldAds, 24 * 60 * 60 * 1000);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});