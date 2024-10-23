import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto">
        <ul className="flex space-x-4">
          <li><Link to="/" className="text-white">Home</Link></li>
          <li><Link to="/products" className="text-white">Products</Link></li>
          <li><Link to="/cart" className="text-white">Cart</Link></li>
          <li><Link to="/admin" className="text-white">Admin</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
