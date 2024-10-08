import React, { useState } from "react";
import Spinner from "./Spinner";
import "../Styles/productCard.css";

const ProductCard = ({ name, rate_in_rs, image, onAddToCart }) => {
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState("");

  const handleAddToCart = (e) => {
    e.stopPropagation();
    setLoading(true);
    setNotification("");

    setTimeout(() => {
      if (onAddToCart) {
        onAddToCart({ name, rate_in_rs, image }, 1);
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
    <div className="product-card">
      <img src={image} alt={name} />
      <div className="product-info">
        <p className="product-name">{name}</p>
        <p className="new-price">₹{rate_in_rs}</p>
      </div>

      <button
        className="enquiry-btn"
        onClick={handleAddToCart}
        disabled={loading}
      >
        {loading ? <Spinner /> : "Add to Cart"}
      </button>
      {/* Notification Message display*/}
      {notification && <div className="notification">{notification}</div>}
    </div>
  );
};

export default ProductCard;
