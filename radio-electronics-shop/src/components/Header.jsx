import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaShoppingCart,
  FaHome,
  FaBoxes,
  FaUserPlus,
  FaSignInAlt,
  FaSignOutAlt,
  FaWallet,
  FaUserCircle
} from "react-icons/fa";

const Header = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
useEffect(() => {
  fetch("http://localhost:3001/api/auth/me", {
    credentials: "include"
  })
    .then(res => {
      if (res.ok) return res.json();
      return null;
    })
    .then(data => {
      if (data && data.email) {
        setUser(data);
      } else {
        setUser(null);
      }
    });
}, []);
useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/auth/me", {
        credentials: "include"
      });

      const data = await res.json();

      if (res.ok) {
        setUser(data);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error("Ошибка загрузки пользователя:", err);
      setUser(null);
    }
  };

  fetchUser();
}, []);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:3001/api/auth/logout", {
        method: "POST",
        credentials: "include"
      });

      setUser(null);
      navigate("/login");
    } catch (err) {
      alert("Ошибка выхода");
    }
  };

  return (
    <header className="bg-dark text-white p-3">
      <div className="container d-flex justify-content-between align-items-center">
        <Link to="/" className="text-white text-decoration-none">
          <h1 className="m-0">РадиоМаркет</h1>
        </Link>

        <nav>
          <ul className="list-unstyled d-flex gap-4 m-0 flex-wrap justify-content-end">
            <li>
              <Link
                to="/"
                className="text-white text-decoration-none d-flex align-items-center gap-1"
              >
                <FaHome /> Главная
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                className="text-white text-decoration-none d-flex align-items-center gap-1"
              >
                <FaBoxes /> Товары
              </Link>
            </li>
            <li>
              <Link
                to="/cart"
                className="text-white text-decoration-none d-flex align-items-center gap-1"
              >
                <FaShoppingCart /> Корзина
              </Link>
            </li>

            {!user && (
              <>
                <li>
                  <Link
                    to="/register"
                    className="text-white text-decoration-none d-flex align-items-center gap-1"
                  >
                    <FaUserPlus /> Регистрация
                  </Link>
                </li>
                <li>
                  <Link
                    to="/login"
                    className="text-white text-decoration-none d-flex align-items-center gap-1"
                  >
                    <FaSignInAlt /> Войти
                  </Link>
                </li>
              </>
            )}

            {user && (
              <>
                <li className="d-flex align-items-center gap-2">
                  <span className="d-flex align-items-center gap-1">
                    <FaWallet /> {(user.wallet || 0).toFixed(2)} ₽
                  </span>
                </li>
                <li>
                  <Link
                    to="/profile"
                    className="text-white text-decoration-none d-flex align-items-center gap-1 me-2"
                  >
                    <FaUserCircle /> Профиль
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="btn btn-outline-light btn-sm d-flex align-items-center gap-1"
                  >
                    <FaSignOutAlt /> Выйти
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;