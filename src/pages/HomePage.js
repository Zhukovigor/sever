import React, { useState, useEffect } from "react";
import { Card, Button, Col, Row, Typography, Spin, Select } from "antd";
import { Link } from "react-router-dom";
import { DollarOutlined, HeartOutlined, HeartFilled } from "@ant-design/icons";
import Slider from "react-slick"; // Импортируем Slider из react-slick
import adsData from "../assets/ads.json";
import "slick-carousel/slick/slick.css"; // Импортируем стили для карусели
import "slick-carousel/slick/slick-theme.css"; // Импортируем тему для карусели
import "./HomePage.css"; // Подключение стилей для главной страницы

const { Title, Text } = Typography;
const { Option } = Select;

const HomePage = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true); // Стейт для загрузки
  const [favorites, setFavorites] = useState([]); // Стейт для избранных
  const [selectedCategory, setSelectedCategory] = useState(null); // Стейт для выбранной категории

  useEffect(() => {
    // Загружаем избранные из localStorage при монтировании компонента
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);

    // Симуляция загрузки данных
    setTimeout(() => {
      setAds(adsData);
      setLoading(false);
    }, 1000); // Задержка 1 секунда
  }, []);

  // Функция для форматирования цены
  const formatPrice = (price) => {
    return (
      price
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " руб."
    ); // Добавление пробела и рубля
  };

  // Функция для добавления/удаления объявления из избранного
  const toggleFavorite = (adId) => {
    const updatedFavorites = favorites.includes(adId)
      ? favorites.filter((id) => id !== adId) // Удалить из избранного
      : [...favorites, adId]; // Добавить в избранное

    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites)); // Сохраняем избранное в localStorage
  };

  // Фильтруем объявления по категории, если категория выбрана
  const filteredAds = selectedCategory
    ? ads.filter((ad) => ad.category === selectedCategory)
    : ads;

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Spin size="large" />
      </div>
    );
  }

  // Настройки для слайдера
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="home-page">
      <Title level={2} className="home-page-title">
        РЕКОМЕНДАЦИИ
      </Title>

      {/* Фильтр по категориям */}
      <div className="category-filter">
        <Select
          allowClear
          placeholder="Выберите категорию"
          onChange={(value) => setSelectedCategory(value)}
          style={{ width: "100%", marginBottom: "20px" }}
        >
          {[...new Set(ads.map((ad) => ad.category))].map((category) => (
            <Option key={category} value={category}>
              {category}
            </Option>
          ))}
        </Select>
      </div>

      <div className="ads-container">
        {filteredAds.length > 0 ? (
          <Row gutter={[16, 16]}>
            {filteredAds.map((ad) => {
              // Формируем title из type, brand и model
              const adTitle = ad.type
                ? `${ad.type}${ad.brand ? ` ${ad.brand}` : ""}${
                    ad.model ? ` ${ad.model}` : ""
                  }`
                : ad.brand && ad.model
                ? `${ad.brand} ${ad.model}`
                : "Не указано";

              // Проверка, является ли объявление избранным
              const isFavorite = favorites.includes(ad.id);

              return (
                <Col key={ad.id} xs={24} sm={12} md={8} lg={6}>
                  <Card
                    hoverable
                    cover={
                      ad.photos && ad.photos.length > 0 ? (
                        <Slider {...sliderSettings}>
                          {ad.photos.map((photo, index) => (
                            <div key={index}>
                              <img
                                alt={adTitle}
                                src={`http://localhost:5000${photo}`}
                                className="ad-image"
                              />
                            </div>
                          ))}
                        </Slider>
                      ) : (
                        <div className="no-image">
                          <Text type="secondary" className="no-image-text">
                            Нет изображения
                          </Text>
                        </div>
                      )
                    }
                    actions={[
                      <Link to={`/ad/${ad.id}`} key={`link-${ad.id}`}>
                        <Button type="link" size="small">
                          Подробнее
                        </Button>
                      </Link>,
                    ]}
                    style={{ borderRadius: "8px", overflow: "hidden" }}
                  >
                    <Title level={5} className="ad-title">
                      {adTitle}
                    </Title>

                    <div className="ad-price">
                      <Text strong>
                        <DollarOutlined /> {formatPrice(ad.price)}
                      </Text>
                    </div>

                    {/* Кнопка "Сердечко" */}
                    <div
                      style={{ position: 'absolute', top: '190px', right: '15px', cursor: 'pointer' }}
                      onClick={() => toggleFavorite(ad.id)}
                    >
                      {isFavorite ? (
                        <HeartFilled style={{ color: 'red', fontSize: '24px' }} />
                      ) : (
                        <HeartOutlined style={{ color: 'gray', fontSize: '24px' }} />
                      )}
                    </div>
                  </Card>
                </Col>
              );
            })}
          </Row>
        ) : (
          <div style={{ textAlign: "center", marginTop: "50px" }}>
            <Text type="secondary">Объявлений пока нет</Text>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;