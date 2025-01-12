// components/Login.js
import React, { useState } from 'react';
import './Form.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Вход:', { email, password });
    // Здесь вы можете добавить логику для отправки данных на сервер
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="login-email">Email</label>
        <input
          type="email"
          id="login-email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="login-password">Пароль</label>
        <input
          type="password"
          id="login-password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Вход</button>
      </form>
    </div>
  );
};

export default Login;