// src/components/Dashboard.js
import React from 'react';
import { Layout, Typography } from 'antd';

const { Content } = Layout;
const { Title } = Typography;

const Dashboard = () => (
  <Content
    style={{
      padding: '24px',
      margin: 0,
      minHeight: 280,
    }}
  >
    <Title level={2}>Добро пожаловать в Админ Панель</Title>
    <p>Здесь будет отображаться статистика и управление данными.</p>
  </Content>
);

export default Dashboard;
