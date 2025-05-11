import React, { useEffect, useState } from "react";
import axios from "axios";

const CheckoutPage = () => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/auth/me", {
          withCredentials: true
        });

        if (res.data && res.data.id) {
          setUser(res.data);
        }
      } catch (err) {
        alert("Для оформления заказа необходимо войти");
        window.location.href = "/login";
      } finally {
        setLoading(false);
      }
    };

    const fetchCart = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/cart", {
          withCredentials: true
        });
        setCart(res.data);
      } catch (err) {
        console.error("Ошибка загрузки корзины:", err);
      }
    };

    fetchUser();
    fetchCart();
  }, []);

  if (loading) return <div>Загрузка...</div>;

  return (
    <div className="container mt-5">
      <h2>Оформление заказа</h2>
      
      <ul className="list-group mb-3">
        {cart.map(item => (
          <li key={item.id} className="list-group-item d-flex justify-content-between">
            <span>{item.name}</span>
            <span>{item.price} × {item.quantity} = {(item.price * item.quantity).toLocaleString()} ₽</span>
          </li>
        ))}
      </ul>

      <h4>Итого: {cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toLocaleString()} ₽</h4>

      <button 
        className="btn btn-success w-100"
        onClick={async () => {
          try {
            const res = await axios.post("http://localhost:3001/api/orders", {
              items: cart
            }, {
              withCredentials: true
            });

            alert(`Заказ оформлен! ID: ${res.data.orderId}`);
            window.location.href = "/";
          } catch (err) {
            alert("Ошибка оформления заказа");
            console.error(err);
          }
        }}
      >
        Подтвердить заказ
      </button>
    </div>
  );
};

export default CheckoutPage;