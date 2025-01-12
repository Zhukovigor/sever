import React from "react";
import { useParams } from "react-router-dom";
import { Typography, Card, Descriptions, Button, Empty, Carousel, Row, Col } from "antd";
import { DollarOutlined, EyeOutlined } from "@ant-design/icons";
import adsData from "../assets/ads.json";

// Функция для форматирования цены
const formatPrice = (price) => {
  return price
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    .concat(" ₽"); // Добавляем символ рубля
};

// Функция для вычисления оставшихся дней
const calculateDaysRemaining = (date) => {
  const currentDate = new Date();
  const adDate = new Date(date);
  const daysRemaining = 30 - Math.floor((currentDate - adDate) / (10000000 * 10 * 60 * 24));
  return daysRemaining > 0 ? daysRemaining : 0;
};

// Функция для склонения слова "день"
const getDayWord = (days) => {
  if (days % 10 === 1 && days % 100 !== 11) return "день";
  if (days % 10 >= 2 && days % 10 <= 4 && (days % 100 < 10 || days % 100 >= 20)) return "дня";
  return "дней";
};

const { Title, Text } = Typography;

const AdPage = () => {
  const { id } = useParams();
  const ad = adsData.find((ad) => ad.id === parseInt(id, 10));

  if (!ad) return <Empty description="Объявление не найдено" />;

  const daysRemaining = calculateDaysRemaining(ad.date);

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
      <Title level={2}>{ad.type} {ad.brand} {ad.model}, {ad.year} год.</Title>

      {/* Карусель с изображениями */}
      {ad.photos && ad.photos.length > 0 ? (
        <Carousel autoplay>
          {ad.photos.map((photo, index) => (
            <div key={index}>
              <img
                alt={`Фото ${index + 1}`}
                src={`${photo}`}  // Убедитесь, что добавляете правильный путь
                style={{ width: "100%", maxHeight: "400px", objectFit: "cover" }}
                onError={(e) => e.target.src = "/path/to/default/image.jpg"}  // Используйте изображение по умолчанию
              />
            </div>
          ))}
        </Carousel>
      ) : (
        <div
          style={{
            height: "400px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#f0f0f0",
          }}
        >
          <Text type="secondary">Изображения отсутствуют</Text>
        </div>
      )}
      
      <Card hoverable style={{ marginBottom: "20px" }}>
        <Row gutter={16}>
          <Col span={12}>
            <Descriptions bordered column={1} size="middle">
              <Descriptions.Item label={<Text strong>Категория</Text>}>
                {ad.category || "Не указано"}
              </Descriptions.Item>
              <Descriptions.Item label={<Text strong>Марка</Text>}>
                {ad.brand || "Не указано"}
              </Descriptions.Item>
              <Descriptions.Item label={<Text strong>Модель</Text>}>
                {ad.model || "Не указано"}
              </Descriptions.Item>
              <Descriptions.Item label={<Text strong>Тип техники</Text>}>
                {ad.type || "Не указано"}
              </Descriptions.Item>
              <Descriptions.Item label={<Text strong>Год выпуска</Text>}>
                {ad.year || "Не указано"}
              </Descriptions.Item>
              <Descriptions.Item label={<Text strong>Мощность</Text>}>
                {ad.power || "Не указано"}
              </Descriptions.Item>
              <Descriptions.Item label={<Text strong>Грузоподъёмность</Text>}>
                {ad.payload || "Не указано"}
              </Descriptions.Item>
            </Descriptions>
          </Col>
          <Col span={12}>
            <Descriptions bordered column={1} size="middle">
              <Descriptions.Item label={<Text strong>Моточасы</Text>}>
                {ad.engineHours || "Не указано"}
              </Descriptions.Item>
              <Descriptions.Item label={<Text strong>ПТС или ПСМ</Text>}>
                {ad.pts || "Не указано"}
              </Descriptions.Item>
              <Descriptions.Item label={<Text strong>VIN, номер кузова или SN</Text>}>
                {ad.vinNumber || "Не указано"}
              </Descriptions.Item>
              <Descriptions.Item label={<Text strong>Доступность</Text>}>
                {ad.availability === "available" ? "В наличии" : ad.availability === "sold" ? "Поставка" : "Не указано"}
              </Descriptions.Item>
              <Descriptions.Item label={<Text strong>Расположение</Text>}>
                {ad.location || "Не указано"}
              </Descriptions.Item>
              <Descriptions.Item label={<Text strong>Состояние</Text>}>
                {ad.condition || "Не указано"}
              </Descriptions.Item>
              <Descriptions.Item label={<Text strong>Пробег</Text>}>
                {ad.mileage || "Не указано"}
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>

        {/* Полное описание */}
        <Row gutter={16}>
          <Col span={24}>
            <Descriptions bordered column={1} size="middle">
              <Descriptions.Item
                label={
                  <div style={{ width: "150px" }}>
                    <Text strong>Полное описание</Text>
                  </div>
                }
              >
                <div
                  style={{
                    padding: "60px",
                    background: "#f5f5f5",
                    borderRadius: "4px",
                    fontSize: "14px",
                    lineHeight: "1",
                    minHeight: "5px",  // Расширяем высоту блока
                    maxHeight: "50px", // Устанавливаем максимальную высоту
                    overflowY: "auto", // Добавляем прокрутку, если описание слишком длинное
                  }}
                >
                  {ad.fullDescription || "Нет описания"}
                </div>
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>

        {/* Перемещаем цену и утильсбор сюда */}
        <Row gutter={16}>
          <Col span={12}>
            <Descriptions bordered column={1} size="middle">
              <Descriptions.Item label={<Text strong>Цена с НДС</Text>}>
                <Text strong>
                  <DollarOutlined /> {formatPrice(ad.price) || "Не указано"}
                </Text>
              </Descriptions.Item>
              <Descriptions.Item label={<Text strong>Утильсбор</Text>}>
                {ad.utilityFee || "Не указано"}
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Descriptions bordered column={1} size="middle">
              <Descriptions.Item label={<Text strong>Просмотры</Text>}>
                <Text strong>
                  <EyeOutlined /> {ad.views || 0}
                </Text>
              </Descriptions.Item>
            </Descriptions>
          </Col>
          <Col span={12}>
            <Descriptions bordered column={1} size="middle">
              <Descriptions.Item label={<Text strong>Удаление через</Text>}>
                <Text type="danger">
                  {daysRemaining} {getDayWord(daysRemaining)}
                </Text>
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
      </Card>

      <Button type="primary" size="large" style={{ width: "100%" }}>
        Связаться с продавцом
      </Button>
    </div>
  );
};

export default AdPage;
