import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Стили для приложения
import App from './App'; // Основной компонент приложения
import reportWebVitals from './reportWebVitals'; // Для измерения производительности

// Создание корневого элемента
const root = ReactDOM.createRoot(document.getElementById('root'));

// Рендеринг приложения внутри элемента с id="root"
root.render(
  <React.StrictMode> {/* Включает строгий режим, помогает выявлять ошибки */}
    <App /> {/* Ваш основной компонент */}
  </React.StrictMode>
);

// Если хотите начать измерение производительности приложения
reportWebVitals();