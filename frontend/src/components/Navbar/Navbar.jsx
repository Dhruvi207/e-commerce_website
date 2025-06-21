import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import logo from '../asset/logo.png';
import cart_icon from '../asset/cart_icon.png';
import { ShopContext } from '../../context/ShopContext';

const Navbar = () => {
  const [menu, setMenu] = useState('shop');
  const { getTotalCartItems, navigate } = useContext(ShopContext);
  const location = useLocation();

  const isLoggedIn = !!localStorage.getItem('auth-token');

  // Add 'orders' page to active state tracking
  useEffect(() => {
    const path = location.pathname;
    if (path === '/') setMenu('shop');
    else if (path.startsWith('/men')) setMenu('men');
    else if (path.startsWith('/women')) setMenu('women');
    else if (path.startsWith('/kids')) setMenu('kids');
    else if (path.startsWith('/orders')) setMenu('orders');
  }, [location]);

  // Define navigation links
  const navLinks = [
    { path: 'shop', label: 'Shop' },
    { path: 'men', label: 'Men' },
    { path: 'women', label: 'Women' },
    { path: 'kids', label: 'Kids' },
    ...(isLoggedIn ? [{ path: 'orders', label: 'My Orders' }] : [])
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container-fluid">

        {/* Logo */}
        <img src={logo} alt="Logo" height="40" />
        <h1 style={{
          fontFamily: 'Poppins, sans-serif',
          fontSize: '30px',
          fontWeight: '700',
          margin: 0
        }}>
          <span style={{ color: '#007bff' }}>Byte</span>
          <span style={{ color: '#e91e63' }}>Buy</span>
        </h1>

        {/* Hamburger button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible section */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {navLinks.map(({ path, label }) => (
              <li
                key={path}
                className={`nav-item ${menu === path ? 'active' : ''}`}
                onClick={() => setMenu(path)}
              >
                <Link className="nav-link" to={`/${path === 'shop' ? '' : path}`}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile menu (Hamburger) */}
          <div className="d-lg-none d-flex flex-column align-items-start ps-3 pt-3 gap-3">
            {isLoggedIn
              ? <button
                  className="btn btn-outline-secondary rounded-pill px-4"
                  onClick={() => {
                    localStorage.removeItem('auth-token');
                    window.location.replace('/');
                  }}
                >
                  Logout
                </button>
              : <Link to="/login">
                  <button className="btn btn-outline-secondary rounded-pill px-4">
                    Login
                  </button>
                </Link>}

            <Link to="/cart" className="position-relative">
              <img src={cart_icon} alt="Cart" width="30" />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {getTotalCartItems()}
              </span>
            </Link>
          </div>
        </div>

        {/* Desktop right-side buttons */}
        <div className="d-none d-lg-flex align-items-center ms-3 gap-3">
          {isLoggedIn
            ? <button
                className="btn btn-outline-secondary rounded-pill px-4"
                onClick={() => {
                  localStorage.removeItem('auth-token');
                  window.location.replace('/');
                }}
              >
                Logout
              </button>
            : <Link to="/login">
                <button className="btn btn-outline-secondary rounded-pill px-4">
                  Login
                </button>
              </Link>}

          <Link to="/cart" className="position-relative">
            <img src={cart_icon} alt="Cart" width="30" />
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {getTotalCartItems()}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
