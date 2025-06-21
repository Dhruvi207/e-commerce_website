import React from 'react';
import './Navbar.css';
import navlogo from '../../assets/logo.png';
import navProfile from '../../assets/admin_logo.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo-text">
        <img src={navlogo} alt="" className="nav-logo" />
        <h1 style={{
      fontFamily: 'Poppins, sans-serif',
      fontSize: '20px',
      fontWeight: '700',
      margin: 0
    }}>
      <span style={{ color: '#007bff' }}>Byte</span>
      <span style={{ color: '#e91e63' }}>Buy</span>
    <br/> Admin Panel</h1>
      </div>

      <div className="profile-container">
        <img src={navProfile} alt="profile" className="nav-profile" />
        <div className="logout-hover">
          <Link to="http://localhost:3000/">
            <button className="logout-btn">Logout</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
