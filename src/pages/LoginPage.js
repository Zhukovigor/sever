// src/pages/LoginPage.js
import React, { useState } from 'react';
import { Input, Button, Form, message } from 'antd';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    setLoading(true);
    // Пример проверки логина и пароля
    if (values.username === 'admin' && values.password === 'admin') {
      message.success('Вход успешен');
      navigate('/admin');  // Перенаправляем в админ панель
    } else {
      message.error('Неверный логин или пароль');
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Вход в админ панель</h2>
      <Form onFinish={handleLogin}>
        <Form.Item name="username" rules={[{ required: true, message: 'Введите логин!' }]}>
          <Input placeholder="Логин" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: 'Введите пароль!' }]}>
          <Input.Password placeholder="Пароль" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Войти
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
