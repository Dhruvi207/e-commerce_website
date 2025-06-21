import React from 'react';
import './DashBoard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-box">
        <h2>Welcome to the Admin Dashboard</h2>
        <p>You can manage products, view orders, and update statuses using the sidebar.</p>
      </div>
    </div>
  );
};

export default Dashboard;
