import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Input, Button, message, Upload, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

const EditAdPage = () => {
  const { id } = useParams(); // Получаем ID объявления из URL
  const navigate = useNavigate();
  const [ad, setAd] = useState(null);

  useEffect(() => {
    // Загрузка данных объявления
    axios.get(`/api/ads/${id}`)
      .then(response => {
        setAd(response.data);
      })
      .catch(error => {
        message.error("Не удалось загрузить объявление");
      });
  }, [id]);

  const handleSubmit = (values) => {
    const formData = new FormData();

    // Добавляем все поля формы в formData
    Object.keys(values).forEach(key => {
      formData.append(key, values[key]);
    });

    // Добавляем фотографии, если они есть
    if (values.photos) {
      values.photos.forEach(photo => {
        formData.append("photos", photo.originFileObj);
      });
    }

    // Отправляем запрос на обновление объявления
    axios.put(`/api/ads/${id}`, formData)
      .then(response => {
        message.success("Объявление обновлено успешно");
        navigate(`/ad/${id}`);  // Перенаправляем на страницу объявления
      })
      .catch(error => {
        message.error("Ошибка при обновлении объявления");
      });
  };

  if (!ad) {
    return <div>Загрузка...</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Редактирование объявления</h2>
      <Form onFinish={handleSubmit} initialValues={ad} encType="multipart/form-data" layout="vertical">
        <Form.Item name="title" label="Заголовок" rules={[{ required: true, message: 'Пожалуйста, введите заголовок' }]}>
          <Input />
        </Form.Item>

        <Form.Item name="description" label="Описание" rules={[{ required: true, message: 'Пожалуйста, введите описание' }]}>
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item name="price" label="Цена" rules={[{ required: true, message: 'Пожалуйста, введите цену' }]}>
          <Input type="number" />
        </Form.Item>

        <Form.Item name="category" label="Категория" rules={[{ required: true, message: 'Пожалуйста, выберите категорию' }]}>
          <Select placeholder="Выберите категорию">
            <Option value="category1">Категория 1</Option>
            <Option value="category2">Категория 2</Option>
            <Option value="category3">Категория 3</Option>
          </Select>
        </Form.Item>

        <Form.Item name="type" label="Тип" rules={[{ required: true, message: 'Пожалуйста, введите тип' }]}>
          <Input />
        </Form.Item>

        <Form.Item name="brand" label="Бренд" rules={[{ required: true, message: 'Пожалуйста, введите бренд' }]}>
          <Input />
        </Form.Item>

        <Form.Item name="model" label="Модель" rules={[{ required: true, message: 'Пожалуйста, введите модель' }]}>
          <Input />
        </Form.Item>

        <Form.Item name="photos" label="Фотографии" valuePropName="fileList" getValueFromEvent={normFile}>
          <Upload name="photos" listType="picture" beforeUpload={() => false}>
            <Button icon={<UploadOutlined />}>Загрузить</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Сохранить изменения
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

// Функция для обработки загрузки файлов
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

export default EditAdPage;