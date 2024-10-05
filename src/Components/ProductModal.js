import React, { useState } from "react";
import Spinner from "./Spinner";
import "../Styles/productModal.css";

const ProductModal = ({ product, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState("");

  if (!product) return null;

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleAddtoCart = () => {
    setLoading(true);
    setNotification("");
    setTimeout(() => {
      if (onAddToCart && quantity > 0) {
        onAddToCart(product, quantity);
        setNotification("Added to Cart");
      }
      setLoading(false);
      //remove notification
      setTimeout(() => {
        setNotification("");
      }, 3000);
    }, 2000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <img src={product.image} alt={product.name} className="modal-image" />
        <div className="modal-info">
          <h2>{product.name}</h2>
          <p className="new-price">₹{product.rate_in_rs}</p>

          <div className="quantity-control">
            <button className="quantity-btn" onClick={handleDecrement}>
              -
            </button>
            <span className="quantity">{quantity}</span>
            <button className="quantity-btn" onClick={handleIncrement}>
              +
            </button>
            <button
              className="enquiry-btn"
              onClick={handleAddtoCart}
              disabled={loading}
            >
              {loading ? <Spinner /> : " Add to Cart"}
            </button>
            {/* Notification Message display*/}
            {notification && <div className="notification">{notification}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;