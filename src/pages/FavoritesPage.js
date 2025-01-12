import React from 'react';
import { Row, Col, Card, Typography, Button } from 'antd';
import { Link } from 'react-router-dom';
import { DollarOutlined, HeartFilled } from '@ant-design/icons';
import Slider from 'react-slick'; // Импортируем Slider из react-slick
import './FavoritesPage.css'; // Подключение стилей для страницы избранного

const { Title, Text } = Typography;

const FavoritesPage = ({ favorites, ads }) => {
  const favoriteAds = ads.filter(ad => favorites.includes(ad.id));

  // Функция для форматирования цены
  const formatPrice = (price) => (
    price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " руб."
  );

  // Настройки для слайдера
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div style={{ padding: '20px' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '30px' }}>
        Избранные объявления
      </Title>

      <Row gutter={[16, 16]}>
        {favoriteAds.length > 0 ? (
          favoriteAds.map((ad) => {
            // Формируем title из type, brand и model
            const adTitle = ad.type
              ? `${ad.type}${ad.brand ? ` ${ad.brand}` : ''}${ad.model ? ` ${ad.model}` : ''}`
              : ad.brand && ad.model
                ? `${ad.brand} ${ad.model}`
                : 'Не указано';

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
                  <div className="favorite-heart">
                    <HeartFilled className="heart-icon" />
                  </div>

                  <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
                    <Link to={`/ad/${ad.id}`}>
                      <Button type="primary" size="small">Подробнее</Button>
                    </Link>
                  </div>
                </Card>
              </Col>
            );
          })
        ) : (
          <Col span={24} style={{ textAlign: 'center', marginTop: '20px' }}>
            <Text type="secondary">Нет избранных объявлений</Text>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default FavoritesPage;