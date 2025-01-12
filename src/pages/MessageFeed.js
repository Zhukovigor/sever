// src/components/MessageFeed.js
import React, { useState, useEffect } from "react";
import axios from "axios"; // Для работы с API

const MessageFeed = () => {
  const [messages, setMessages] = useState([]);

  // Функция для получения сообщений с API
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/telegram/messages'); // Замените на ваш URL API
        setMessages(response.data);
      } catch (error) {
        console.error("Ошибка при получении сообщений:", error);
      }
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 5000); // Обновляем ленту каждые 5 секунд

    return () => clearInterval(interval); // Очищаем интервал при размонтировании компонента
  }, []);

  return (
    <div className="message-feed">
      {messages.map((message, index) => (
        <div key={index} className="message">
          <p>{message.text}</p>
        </div>
      ))}
    </div>
  );
};

export default MessageFeed;
