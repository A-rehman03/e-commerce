// src/pages/Cart.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../features/cartSlice';

const Cart = () => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  if (cartItems.length === 0) return <p>Your cart is empty.</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      {cartItems.map((item, index) => (
        <div key={index} className="flex justify-between items-center border-b py-4">
          <img src={item.image} alt={item.title} className="h-20 w-20 object-cover" />
          <h2 className="text-xl font-semibold">{item.title}</h2>
          <p className="text-gray-700">${item.price}</p>
          <button
            onClick={() => dispatch(removeFromCart(item.id))}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default Cart;
