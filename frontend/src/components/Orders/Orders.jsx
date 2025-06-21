import React, { useEffect, useState } from 'react';
import './Orders.css';

const Orders = () => {
    const [orderData, setOrderData] = useState([]);

    const loadOrderData = async () => {
        const token = localStorage.getItem('auth-token');

        try {
            if (!token) return;

            const response = await fetch('http://localhost:4000/userOrders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token,
                },
                body: JSON.stringify({}),
            });

            const data = await response.json();

            if (data.success) {
                let allOrdersItem = [];
                data.orders.forEach(order => {
                    order.items.forEach(item => {
                        const itemCopy = structuredClone(item);
                        itemCopy.status = order.status;
                        itemCopy.payment = order.payment;
                        itemCopy.paymentmethod = order.paymentmethod;
                        itemCopy.date = order.date;
                        allOrdersItem.push(itemCopy);
                    });
                });
                setOrderData(allOrdersItem.reverse());
            }
        } catch (error) {
            alert('There is a problem loading orders.');
        }
    };

    useEffect(() => {
        loadOrderData();
    }, []);

    return (
        <div className="orders">
            <div className="orders-title">
                <h1>My Orders</h1>
            </div>

            <div className="orders-list">
                {orderData.map((item, index) => (
                    <div key={index} className="order-card">
                        <div className="order-left">
                            <img src={item.image} alt="product" className="order-image" />
                            <div className="order-info">
                                <p className="order-name">{item.name}</p>
                                <div className="order-meta">
                                    <p>Rs. {item.price}</p>
                                    <p>Quantity: {item.quantity}</p>
                                </div>
                                <p className="order-date">Date: <span>{new Date(item.date).toDateString()}</span></p>
                                <p className="order-payment">Payment: <span>{item.paymentmethod}</span></p>
                            </div>
                        </div>

                        <div className="order-right">
                            <div className="order-status">
                                <span className="status-dot"></span>
                                <span className="status-text">{item.status}</span>
                            </div>
                            <button onClick={loadOrderData} className="track-order-btn">Track Order</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Orders;
