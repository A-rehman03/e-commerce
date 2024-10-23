// src/pages/ProductList.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '../redux/productSlice';
import axios from 'axios';

const ProductList = () => {
  const dispatch = useDispatch();
  const { items: products, status } = useSelector(state => state.products);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products'); // Example API
        dispatch(setProducts(response.data));
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, [dispatch]);

  if (status === 'loading') return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {products.map(product => (
  <div key={product.id} className="border p-4 shadow-lg">
    <Link to={`/products/${product.id}`}>
      <img src={product.image} alt={product.title} className="h-40 w-full object-cover" />
      <h2 className="text-xl font-semibold mt-2">{product.title}</h2>
    </Link>
    <p className="text-gray-500">${product.price}</p>
    <button className="bg-blue-500 text-white mt-4 py-2 px-4 rounded">Add to Cart</button>
  </div>
))}
      </div>
    </div>
  );
};

export default ProductList;
