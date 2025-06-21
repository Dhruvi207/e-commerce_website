import React from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import add_product from '../../assets/add-product.png';
import product_list from '../../assets/product_list.png';
import total_orders from '../../assets/total_orders.jpg';
import dashboard from '../../assets/dashboard.jpg'

const Sidebar = () => {
  return (
    <div className="sidebar">
     

      <Link to="/admin"  className="sidebar-item">
      <img src={dashboard} alt="" />
      <p>DashBoard</p></Link>

      <Link to="/addproduct" className="sidebar-item">
        <img src={add_product} alt="Add Product" />
        <p>Add Product</p>
      </Link>

      <Link to="/listproduct" className="sidebar-item">
        <img src={product_list} alt="Product List" />
        <p>Product List</p>
      </Link>

      <Link to="/totalorders" className="sidebar-item">
        <img src={total_orders} alt="Total Orders" />
        <p>Total Orders</p>
      </Link>
    </div>
  );
};

export default Sidebar;
