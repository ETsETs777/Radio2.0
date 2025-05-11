import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Cart = ({ cartItems, onRemoveFromCart, onUpdateQuantity }) => {
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Корзина пуста");
      return;
    }

    navigate('/checkout');
  };

  return (
    <div className="cart">
      <h3>Ваша корзина</h3>
      {cartItems.length === 0 ? (
        <p>Корзина пуста</p>
      ) : (
        <>
          <div className="list-group mb-3">
            {cartItems.map((item) => (
              <div key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-3">
                  <img 
                    src={item.image || 'https://via.placeholder.com/50 '} 
                    alt={item.name} 
                    width="50" 
                    className="img-thumbnail"
                  />
                  <div>
                    <h6 className="mb-0">{item.name}</h6>
                    <small>{item.price.toLocaleString()} ₽</small>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <input 
                    type="number" 
                    min="1" 
                    value={item.quantity} 
                    onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value))}
                    className="form-control form-control-sm" 
                    style={{ width: '60px' }}
                  />
                  <button 
                    className="btn btn-danger btn-sm"
                    onClick={() => onRemoveFromCart(item.id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="d-flex justify-content-between align-items-center mt-3">
            <h5>Итого: {totalPrice.toLocaleString()} ₽</h5>
            <button 
              className="btn btn-success"
              onClick={handleCheckout}
            >
              Оформить заказ
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;