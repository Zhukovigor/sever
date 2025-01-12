import React, { useState } from 'react';
import './Form.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Регистрация:', { username, email, password, rememberMe });
    // Здесь вы можете добавить логику для отправки данных на сервер
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>Регистрация</h2>
      </div>
      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="register-username">Имя пользователя</label>
        <input
          type="text"
          id="register-username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="register-email">Email</label>
        <input
          type="email"
          id="register-email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="register-password">Пароль</label>
        <input
          type="password"
          id="register-password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="form-remember-me">
          <input
            type="checkbox"
            id="remember-me"
            name="remember-me"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label htmlFor="remember-me">Запомнить меня</label>
        </div>
        <button type="submit">Регистрация</button>
        <div className="form-footer">
          <a href="/forgot-password" className="forgot-password-link">Забыли пароль?</a>
        </div>
      </form>
    </div>
  );
};

export default Register;