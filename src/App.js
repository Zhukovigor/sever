import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { Modal } from "antd";
import AppHeader from "./components/AppHeader";
import HomePage from "./pages/HomePage";
import SubmitAdPage from "./pages/SubmitAdPage";
import AdPage from "./pages/AdPage";
import EditAdPage from "./pages/EditAdPage";
import Menu from './components/Menu';
import './components/Menu.css';
import CategoryPage from './pages/CategoryPage';
import FavoritesPage from './pages/FavoritesPage';
import Register from './components/Register';
import adsData from './assets/ads.json';
import { searchAds } from './search';
import "./App.css";

const App = () => {
  const [favorites, setFavorites] = useState([]);
  const [ads, setAds] = useState(adsData);
  const [searchResults, setSearchResults] = useState(adsData);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Функция для добавления/удаления объявления из избранного
  const toggleFavorite = (adId) => {
    if (favorites.includes(adId)) {
      setFavorites(favorites.filter(favId => favId !== adId));
    } else {
      setFavorites([...favorites, adId]);
    }
  };

  // Функция для обновления объявления
  const updateAd = (updatedAd) => {
    setAds(prevAds => prevAds.map(ad => ad.id === updatedAd.id ? updatedAd : ad));
  };

  // Функция для поиска объявлений
  const handleSearch = (query) => {
    const filteredAds = searchAds(ads, query);
    setSearchResults(filteredAds);
  };

  return (
    <Router>
      <AppHeader onSearch={handleSearch} showModal={showModal} />
      <Menu />
      <nav>
        <NavLink to="/" className={({ isActive }) => isActive ? "active-link" : ""}>Главная</NavLink> |
        <NavLink to="/favorites" className={({ isActive }) => isActive ? "active-link" : ""}>Избранные</NavLink> |
      </nav>
      <Routes>
        <Route path="/" element={<HomePage ads={searchResults} favorites={favorites} toggleFavorite={toggleFavorite} />} />
        <Route path="/ad/:id" element={<AdPage ads={ads} />} />
        <Route path="/submit" element={<SubmitAdPage setAds={setAds} />} />
        <Route path="/edit/:id" element={<EditAdPage ads={ads} updateAd={updateAd} />} />
        <Route path="/category/:categoryName" element={<CategoryPage ads={searchResults} favorites={favorites} toggleFavorite={toggleFavorite} />} />
        <Route path="/favorites" element={<FavoritesPage favorites={favorites} ads={ads} />} />
      </Routes>
      <Modal title="Регистрация" visible={isModalVisible} onCancel={handleCancel} footer={null}>
        <Register />
      </Modal>
    </Router>
  );
};

export default App;