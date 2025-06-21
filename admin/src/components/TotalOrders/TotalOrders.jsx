import React, { useEffect, useState } from 'react';
import './TotalOrders.css';
import icon from '../../assets/icon.jpg';

const TotalOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await fetch('http://localhost:4000/totalorders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      });

      const data = await response.json();
      if (data.success) {
        setOrders(data.orders);
      } else {
        alert("There is a problem displaying total orders");
      }
    } catch (error) {
      console.error('Error fetching total orders:', error);
    }
  };

  const statusHandler = async (status, orderId) => {
    try {
      const response = await fetch('http://localhost:4000/updatestatus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, status })
      });

      const data = await response.json();

      if (data.success) {
        await fetchAllOrders(); // Refresh order list
      } else {
        alert("Status update failed: " + data.message);
      }
    } catch (error) {
      console.error(error);
      alert('There is a problem while updating status');
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="totalorders">
      <h1>Total Orders</h1>
      {orders.map((order) => (
        <div key={order._id} className="order-card">
          <img src={icon} alt="Order Icon" className="order-img" />

          <div className="order-info">
            {order.items.map((item, i) => (
              <p key={i} className="item-name">
                {item.name} x {item.quantity}{i !== order.items.length - 1 ? ',' : ''}
              </p>
            ))}
            <p className="user-name">
              {order.address.firstname} {order.address.lastname}
            </p>
            <p className="address-line">{order.address.street}</p>
            <p className="address-line">
              {order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}
            </p>
            <p className="address-line">{order.address.phone}</p>
          </div>

          <div className="order-meta">
            <p className="items-count">Items: {order.items.length}</p>
            <p>Method: {order.paymentmethod}</p>
            <p>Payment: {order.payment ? 'Done' : 'Pending'}</p>
            <p>Date: {new Date(order.date).toLocaleDateString()}</p>
          </div>

          <div className="order-amount">Rs. {order.amount}</div>

          <select
            value={order.status}
            onChange={(e) => statusHandler(e.target.value, order._id)}
            className="order-status-select"
          >
            <option value="Order Placed">Order Placed</option>
            <option value="Shipped">Shipped</option>
            <option value="Out For Delivery">Out For Delivery</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
      ))}
    </div>
  );
};

export default TotalOrders;
