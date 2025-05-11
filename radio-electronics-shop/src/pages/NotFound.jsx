import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container text-center mt-5">
      <h1>404 — Страница не найдена</h1>
      <p>Страница, которую вы запрашиваете, не существует.</p>
      <Link to="/">На главную</Link>
    </div>
  );
};

export default NotFound;