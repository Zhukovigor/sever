import React from 'react';
import { Link } from 'react-router-dom';
import categories from '../assets/categories.json'; // JSON с данными о категориях

const Menu = () => {
  return (
    <div className="menu-container">
      {categories.map((item) => (
        <div key={item.id} className="menu-item">
          <Link to={`/category/${item.name}`}>
            <img src={item.icon} alt={item.name} className="menu-icon" />
            <span className="menu-text">{item.name}</span>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Menu;
