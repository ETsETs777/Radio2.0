import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaCartPlus, FaRegHeart, FaHeart, FaRegStar } from "react-icons/fa";

const ProductCard = ({ product, onAddToCart }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const formatDescription = (text) => {
    const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
    return text.replace(urlRegex, (url) =>
      `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`
    );
  };

  return (
    <div className="card h-100 shadow-sm">
      <Link to={`/products/${product.id}`} className="text-decoration-none text-dark">
        <div className="position-relative">
          <img
            src={product.image || "https://via.placeholder.com/300 "}
            className="card-img-top"
            alt={product.name}
            style={{ height: '200px', objectFit: 'contain' }}
          />
        </div>
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{product.name}</h5>

          <p
            className="card-text flex-grow-1 text-muted mb-2"
            dangerouslySetInnerHTML={{ __html: formatDescription(product.description) }}
          ></p>

          <div className="d-flex justify-content-between align-items-center mt-auto">
            <span className="fw-bold">{product.price.toLocaleString()} ₽</span>
          </div>
        </div>
      </Link>

      <div className="card-footer bg-white border-0">
        <div className="d-flex justify-content-between align-items-center">
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={() => setIsFavorite(!isFavorite)}
            aria-label={isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
          >
            {isFavorite ? <FaHeart className="text-danger" /> : <FaRegHeart />}
          </button>

          <button
            className="btn btn-primary btn-sm"
            onClick={() => onAddToCart(product.id)} 
            aria-label="Добавить в корзину"
          >
            <FaCartPlus /> В корзину
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;