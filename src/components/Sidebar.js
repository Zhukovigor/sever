// components/Sidebar.js
import React from 'react';
import { Layout, Menu } from 'antd';
import { HomeOutlined, AppstoreAddOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Sider } = Layout;

const Sidebar = () => (
  <Sider width={200} className="site-layout-background">
    <Menu mode="inline" defaultSelectedKeys={['1']} style={{ height: '100%', borderRight: 0 }}>
      <Menu.Item key="1" icon={<HomeOutlined />}>
        <Link to="/">Главная</Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<AppstoreAddOutlined />}>
        <Link to="/products">Продукты</Link>
      </Menu.Item>
      <Menu.Item key="3" icon={<UserOutlined />}>
        <Link to="/users">Пользователи</Link>
      </Menu.Item>
    </Menu>
  </Sider>
);

export default Sidebar;
