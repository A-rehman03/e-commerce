import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import ProductDetail from './pages/ProductDetail';
import ProductList from './pages/ProductList';
import Cart from './pages/Cart';
import AdminPanel from './components/AdminPanel';
import Home from './components/Home';
import Checkout from './components/Checkout'; // Add missing import
import OrderHistory from './components/OrderHistory'; // Add missing import

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} /> {/* Removed extra period */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} /> {/* Added missing import */}
        <Route path="/order-history" element={<OrderHistory />} /> {/* Added missing import */}
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
};

export default App;
