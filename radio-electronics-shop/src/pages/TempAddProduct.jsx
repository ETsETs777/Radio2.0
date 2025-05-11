import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TempAddProduct() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "Компоненты",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
          image: "https://via.placeholder.com/300",
        }),
      });
      if (response.ok) {
        alert("Товар добавлен!");
        navigate("/products");
      }
    } catch (error) {
      alert("Ошибка: " + error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Добавить товар</h2>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <input
            type="text"
            placeholder="Название"
            className="form-control"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <textarea
            placeholder="Описание"
            className="form-control"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="number"
            placeholder="Цена"
            className="form-control"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Добавить
        </button>
      </form>
    </div>
  );
}
