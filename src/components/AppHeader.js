import React, { useState, useEffect } from "react";
import { Layout, Input, Button, Menu, Dropdown, Space } from "antd";
import { SearchOutlined, BellOutlined, UserOutlined, AppstoreOutlined, HeartOutlined, HeartFilled, MessageOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import categoriesData from "../assets/categories.json";
import logo from "../logo.png";
import "./AppHeader.css";

const { Header } = Layout;

const AppHeader = ({ onSearch, showModal }) => {
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Состояние для поиска
  const [isFavoriteClicked, setIsFavoriteClicked] = useState(false); // Состояние для отслеживания клика на сердечко
  const navigate = useNavigate();

  useEffect(() => {
    setCategories(categoriesData);
  }, []);

  const categoriesMenu = (
    <Menu>
      {categories.map((category) => (
        <Menu.Item key={category.id}>{category.name}</Menu.Item>
      ))}
    </Menu>
  );

  const userMenu = (
    <Menu>
      <Menu.Item key="1">Мои объявления</Menu.Item>
      <Menu.Item key="2" onClick={() => navigate("/favorites")}>Избранное</Menu.Item>
      <Menu.Item key="3">Настройки</Menu.Item>
      <Menu.Item key="4">Вход</Menu.Item>
    </Menu>
  );

  const handleFavoriteClick = () => {
    if (isFavoriteClicked) {
      setIsFavoriteClicked(false);
      navigate("/"); // Переход на главную страницу
    } else {
      setIsFavoriteClicked(true);
      navigate("/favorites"); // Переход на страницу Избранное
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Обновляем состояние при изменении поискового запроса
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchQuery); // Выполняем поиск
      navigate("/"); // Переход на главную страницу (или на страницу результатов поиска, если такая есть)
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(); // Выполняем поиск при нажатии на Enter
    }
  };

  const handleLoginRegister = () => {
    showModal(); // Показать модальное окно логина
  };

  return (
    <Header className="app-header">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo-image" />
        <Link to="/" className="logo">
          СПЕЦТЕХНИКА
        </Link>
      </div>
      <Dropdown overlay={categoriesMenu} trigger={["click"]}>
        <Button type="text" className="categories-button">
          <AppstoreOutlined style={{ marginRight: "1px" }} /> 
          Все категории
        </Button>
      </Dropdown>
      <Input
        placeholder="Искать на сайте..."
        suffix={<SearchOutlined />}
        value={searchQuery}
        onChange={handleSearchChange}
        onKeyPress={handleKeyPress} // Обработчик события нажатия клавиши
        className="search-input"
      />
      <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch} />

      <Space size="large">
        <Button type="text" icon={<BellOutlined />} />
        <Button
          type="text"
          icon={isFavoriteClicked ? <HeartFilled style={{ color: "red" }} /> : <HeartOutlined />}
          onClick={handleFavoriteClick}
        />
        <Button type="text" icon={<MessageOutlined />} />
        <Dropdown overlay={userMenu} placement="bottomRight">
          <Button type="text" icon={<UserOutlined />} />
        </Dropdown>
        <Button type="primary" onClick={handleLoginRegister}>Вход/Регистрация</Button>
        <Link to="/submit">
          <Button type="primary">Подать объявление</Button>
        </Link>
      </Space>
    </Header>
  );
};

export default AppHeader;