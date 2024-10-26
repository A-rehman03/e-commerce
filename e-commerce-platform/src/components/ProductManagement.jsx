// src/components/ProductManagement.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, deleteProduct } from '../features/ProductSlice'; // Assuming we have a productSlice

const ProductManagement = () => {
  const [newProduct, setNewProduct] = useState('');
  const products = useSelector((state) => state.products.items);
  const dispatch = useDispatch();

  const handleAddProduct = () => {
    if (newProduct.trim()) { // Check if the product name is not empty
      dispatch(addProduct({ id: Date.now(), name: newProduct.trim() }));
      setNewProduct(''); // Clear the input field
    }
  };

  const handleDeleteProduct = (id) => {
    dispatch(deleteProduct(id));
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4">Manage Products</h2>
      <div className="mb-4">
        <input
          type="text"
          value={newProduct}
          onChange={(e) => setNewProduct(e.target.value)}
          className="border rounded-lg p-2 mr-2"
          placeholder="New Product Name"
        />
        <button
          onClick={handleAddProduct}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Add Product
        </button>
      </div>
      <ul className="list-none">
        {products.length === 0 ? ( // Check if there are no products
          <li className="text-gray-600">No products available.</li>
        ) : (
          products.map((product) => (
            <li key={product.id} className="flex justify-between items-center mb-2">
              <span className="text-lg">{product.name}</span>
              <button
                onClick={() => handleDeleteProduct(product.id)}
                className="bg-red-600 text-white px-2 py-1 rounded-lg"
              >
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ProductManagement;
