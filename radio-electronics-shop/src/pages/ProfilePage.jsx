import React, { useEffect, useState } from "react";
import axios from "axios";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [amount, setAmount] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/auth/me", {
          withCredentials: true,
        });
        setUser(res.data);
      } catch (err) {
        alert("Ошибка загрузки данных");
      }
    };

    fetchUser();
  }, []);
  const handleAddFunds = async () => {
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      alert("Введите корректную сумму");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3001/api/wallet/add",
        { amount },
        { withCredentials: true }
      );

      setUser({
        ...user,
        wallet: res.data.wallet
      });

      alert("Баланс успешно пополнен!");
    } catch (err) {
      alert("Ошибка пополнения кошелька");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Профиль</h2>

      {user ? (
        <>
          <p><strong>Имя:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Баланс:</strong> {user.wallet} ₽</p>

          <div className="mt-4">
            <h5>Пополнить баланс</h5>
            <input
              type="number"
              className="form-control mb-2"
              placeholder="Сумма"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="0.01"
              step="0.01"
            />
            <button className="btn btn-success" onClick={handleAddFunds}>
              Пополнить
            </button>
          </div>
        </>
      ) : (
        <p>Загрузка данных...</p>
      )}
    </div>
  );
};

export default ProfilePage;