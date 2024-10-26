// src/components/OrderHistory.jsx
import React from 'react';
import { useSelector } from 'react-redux';

const OrderHistory = () => {
  const orders = useSelector((state) => state.orderHistory.orders); // Accessing the orderHistory slice from Redux

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Order History</h1>
      {orders.length === 0 ? (
        <p className="text-gray-700">You have no orders yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border p-4 rounded-lg shadow-md bg-white"
            >
              <h2 className="text-xl font-semibold mb-2">Order #{order.id}</h2>
              <p><strong>Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
              <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
              <h3 className="font-bold mt-4">Items:</h3>
              <ul>
                {order.items.map((item) => (
                  <li key={item.id}>
                    {item.name} - ${item.price.toFixed(2)} x {item.quantity}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
