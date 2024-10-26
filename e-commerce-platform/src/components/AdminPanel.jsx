// src/components/AdminPanel.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '../features/ProductSlice';

const AdminPanel = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.list);
  const [newProduct, setNewProduct] = React.useState({ name: '', price: '', id: '' });

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.id) {
      dispatch(setProducts([...products, newProduct]));
      setNewProduct({ name: '', price: '', id: '' });
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Admin Panel</h1>
      <div className="mt-4">
        <h2 className="text-xl">Manage Products</h2>
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="number"
          placeholder="Product Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Product ID"
          value={newProduct.id}
          onChange={(e) => setNewProduct({ ...newProduct, id: e.target.value })}
          className="border p-2 mr-2"
        />
        <button onClick={handleAddProduct} className="bg-blue-500 text-white p-2 rounded">
          Add Product
        </button>
      </div>
      <div className="mt-4">
        <h2 className="text-xl">Current Products</h2>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              {product.name} - ${product.price}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminPanel;
