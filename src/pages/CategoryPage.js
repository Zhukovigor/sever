import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Button, Col, Row, Typography, Spin } from 'antd';
import { Link } from 'react-router-dom';
import { DollarOutlined, HeartOutlined, HeartFilled } from '@ant-design/icons';
import Slider from 'react-slick'; // Импортируем Slider из react-slick
import adsData from '../assets/ads.json'; // Данные с объявлениями
import 'slick-carousel/slick/slick.css'; // Импортируем стили для карусели
import 'slick-carousel/slick/slick-theme.css'; // Импортируем тему для карусели
import './CategoryPage.css'; // Подключение стилей для страницы категорий

const { Title, Text } = Typography;

const CategoryPage = ({ favorites, toggleFavorite }) => {
  const { categoryName } = useParams(); // Получаем параметр категории из URL
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true); // Стейт для загрузки
  const [selectedCategory, setSelectedCategory] = useState(categoryName); // Стейт для выбранной категории

  useEffect(() => {
    // Загружаем избранные из localStorage при монтировании компонента
    setAds(adsData);
    setLoading(false);
  }, []);

  useEffect(() => {
    setSelectedCategory(categoryName);
  }, [categoryName]);

  // Функция для форматирования цены
  const formatPrice = (price) => {
    return (
      price
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " руб."
    ); // Добавление пробела и рубля
  };

  // Фильтруем объявления по категории
  const filteredAds = selectedCategory
    ? ads.filter((ad) => ad.category === selectedCategory)
    : ads;

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
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
    <div className="category-page">
      <Title level={2} style={{ textAlign: 'center', marginBottom: '30px' }}>
        Объявления категории: {categoryName}
      </Title>

      <Row gutter={[16, 16]}>
        {filteredAds.length > 0 ? (
          filteredAds.map((ad) => {
            // Формируем title из type, brand и model
            const adTitle = ad.type
              ? `${ad.type}${ad.brand ? ` ${ad.brand}` : ''}${
                  ad.model ? ` ${ad.model}` : ''
                }`
              : ad.brand && ad.model
              ? `${ad.brand} ${ad.model}`
              : 'Не указано';

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
                  style={{ borderRadius: '8px', overflow: 'hidden' }}
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
          })
        ) : (
          <Col span={24} style={{ textAlign: 'center', marginTop: '20px' }}>
            <Text type="secondary">Нет объявлений в этой категории</Text>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default CategoryPage;