'use client';
import { useState } from 'react';
import './ProductCartControls.scss';

export default function ProductCartControls() {
  const [count, setCount] = useState(0);
  function incrementCount() {
    setCount((prevCount) => {
      return prevCount + 1;
    });
  }
  function decrementCount() {
    setCount((prevCount) => {
      return prevCount - 1;
    });
  }
  return (
    <div className="product-cart-controls">
      {count === 0 ? (
        <button
          className="product-cart-controls__add-to-cart"
          onClick={incrementCount}
        >
          В Корзину
        </button>
      ) : (
        <div className="product-cart-controls__counter-block">
          <button
            className="product-cart-controls__counter-button"
            onClick={decrementCount}
          >
            -
          </button>
          <span className="product-cart-controls__counter-number">{count}</span>
          <button
            className="product-cart-controls__counter-button product-cart-controls__counter-button_add"
            onClick={incrementCount}
          >
            +
          </button>
        </div>
      )}
    </div>
  );
}
