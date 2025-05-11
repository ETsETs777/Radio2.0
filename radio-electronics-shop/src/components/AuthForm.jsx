import axios from 'axios';
import { useState } from 'react';

const AuthForm = ({ isLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isLogin ? '/api/auth/login' : '/api/auth/register';
      const data = isLogin ? { email, password } : { username, email, password };

      const response = await axios.post(url, data, {
        withCredentials: true
      });

      const successMessage = isLogin
        ? 'Вы успешно вошли'
        : 'Регистрация успешна';

      alert(response.data.message || successMessage);

      window.dispatchEvent(new Event('auth-success'));

      if (!isLogin) {
        window.location.href = '/login';
      }

    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Произошла ошибка';
      alert(errorMessage);
    }
  };

  return (
    <div className="auth-form-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>{isLogin ? 'Вход' : 'Регистрация'}</h2>

        {!isLogin && (
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Имя"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        )}

        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="btn btn-primary w-100">
          {isLogin ? 'Войти' : 'Зарегистрироваться'}
        </button>

        {isLogin && (
          <p className="text-center mt-2">
            <a href="/forgot-password">Забыли пароль?</a>
          </p>
        )}
      </form>
    </div>
  );
};

export default AuthForm;