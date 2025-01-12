// src/pages/AdminPage.js
import React, { useEffect, useState } from 'react';

const AdminPage = () => {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    // Загрузка объявлений из localStorage
    const storedAds = JSON.parse(localStorage.getItem('ads')) || [];
    setAds(storedAds);
  }, []);

  return (
    <div>
      <h2>Все объявления</h2>
      <ul>
        {ads.map((ad) => (
          <li key={ad.id}>{ad.title} - {ad.price}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;
