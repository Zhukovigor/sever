// src/pages/AdminPanel.js
import React, { useState } from "react";
import { Input, Button, Form, message } from "antd";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();  // Для редиректа после подачи объявления

  const handleSubmit = () => {
    // Здесь можно добавить логику отправки данных на сервер или в локальный файл
    if (!title || !description || !price || !imageUrl) {
      message.error("Пожалуйста, заполните все поля!");
      return;
    }

    // Отправка данных (например, в консоль или на сервер)
    console.log({
      title,
      description,
      price,
      imageUrl,
    });

    message.success("Объявление подано успешно!");

    // Перенаправление на главную страницу
    navigate("/");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Подать объявление</h2>
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="Заголовок" required>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Введите заголовок объявления"
          />
        </Form.Item>
        <Form.Item label="Описание" required>
          <Input.TextArea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Введите описание объявления"
          />
        </Form.Item>
        <Form.Item label="Цена" required>
          <Input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Введите цену"
          />
        </Form.Item>
        <Form.Item label="Ссылка на изображение" required>
          <Input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Введите URL изображения"
          />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Подать объявление
        </Button>
      </Form>
    </div>
  );
};

export default AdminPanel;
