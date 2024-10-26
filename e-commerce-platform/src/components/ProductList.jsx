// src/components/ProductList.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null); // State to manage error messages

  useEffect(() => {
    // Fetch products from an API
    axios.get('https://fakestoreapi.com/products')
      .then(response => {
        setProducts(response.data); // Set products data from API response
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setError('Failed to load products.'); // Set error message on failure
        setLoading(false); // Set loading to false on error
      });
  }, []);

  if (loading) {
    return <div className="text-center">Loading products...</div>; // Show loading message
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>; // Show error message
  }

  return (
    <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      {products.map(product => (
        <div key={product.id} className="bg-white shadow-lg rounded-lg p-4">
          <img src={product.image} alt={product.title} className="h-40 w-full object-cover mb-4" />
          <h2 className="text-lg font-bold mb-2">{product.title}</h2>
          <p className="text-gray-700 mb-2">${product.price.toFixed(2)}</p>
          <Link
            to={`/product/${product.id}`}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
