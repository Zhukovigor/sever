// src/components/Header.js

import React from 'react';
import { Layout, Menu, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Header } = Layout;

const AppHeader = () => (
  <Header style={{ padding: '0 20px', backgroundColor: '#fff' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      {/* Название админ панели */}
      <div style={{ fontSize: '20px', fontWeight: 'bold' }}>Админ Панель</div>

      {/* Меню с пунктами */}
      <Menu mode="horizontal" style={{ borderBottom: 'none' }}>
        <Menu.Item key="1">Профиль</Menu.Item>
        <Menu.Item key="2">Настройки</Menu.Item>
        <Menu.Item key="3">Выходы</Menu.Item>
      </Menu>

      {/* Аватар пользователя */}
      <Avatar icon={<UserOutlined />} />
    </div>
  </Header>
);

export default AppHeader;
