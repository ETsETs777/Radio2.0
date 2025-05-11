import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await axios.get("http://localhost:3001/api/auth/me", {
          withCredentials: true
        });

        if (!userRes.data || !userRes.data.id) {
          navigate("/login");
          return;
        }

        setUser(userRes.data);

        const cartRes = await axios.get("http://localhost:3001/api/cart", {
          withCredentials: true
        });
        
        setCart(cartRes.data || []);
      } catch (err) {
        console.error("Ошибка:", err);
        if (err.response?.status === 401) {
          navigate("/login");
        } else {
          setError("Не удалось загрузить корзину");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const removeFromCart = async (productId) => {
    try {
      const res = await axios.post(
        "http://localhost:3001/api/cart/remove",
        { productId },
        { withCredentials: true }
      );
      setCart(res.data);
    } catch (err) {
      console.error("Ошибка удаления товара:", err);
      alert("Не удалось удалить товар");
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return;

    try {
      const res = await axios.post(
        "http://localhost:3001/api/cart/update",
        { productId, quantity },
        { withCredentials: true }
      );
      setCart(res.data);
    } catch (err) {
      console.error("Ошибка обновления количества:", err);
      alert("Не удалось обновить количество");
    }
  };

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert("Корзина пуста");
      return;
    }

    try {
      await axios.post(
        "http://localhost:3001/api/orders",
        { items: cart },
        { withCredentials: true }
      );
      alert("Заказ оформлен!");
      setCart([]);
    } catch (err) {
      console.error("Ошибка оформления заказа:", err);
      alert(err.response?.data?.error || "Ошибка оформления заказа");
    }
  };

  if (loading) {
    return <div className="container mt-5">Загрузка...</div>;
  }

  if (error) {
    return <div className="container mt-5 text-danger">{error}</div>;
  }

  return (
    <div className="container mt-5">
      <h2>Корзина</h2>
      
      {cart.length === 0 ? (
        <p>Ваша корзина пуста</p>
      ) : (
        <>
          <div className="list-group mb-3">
            {cart.map(item => (
              <div key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <h5>{item.name}</h5>
                  <div>
                    Цена: {item.price} ₽ × {item.quantity} = {item.price * item.quantity} ₽
                  </div>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                    className="form-control"
                    style={{ width: "70px" }}
                  />
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="btn btn-danger"
                  >
                    Удалить
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4>Итого: {cart.reduce((sum, item) => sum + item.price * item.quantity, 0)} ₽</h4>
            <button 
              onClick={handleCheckout}
              className="btn btn-success"
              disabled={cart.length === 0}
            >
              Оформить заказ
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;