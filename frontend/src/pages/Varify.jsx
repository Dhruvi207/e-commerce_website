import React, { useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useSearchParams, useNavigate } from 'react-router-dom';

const Varify = () => {
  const { clearCart } = useContext(ShopContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const token = localStorage.getItem('auth-token');

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const response = await fetch('http://localhost:4000/verifyStripe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': token,
          },
          body: JSON.stringify({ success, orderId }),
        });

        const data = await response.json();

        if (data.success) {
          clearCart();
          navigate('/orders');
        } else {
          navigate('/cart');
        }
      } catch (error) {
        console.error("Payment verification failed:", error);
        navigate('/cart');
      }
    };

    if (token) {
      verifyPayment();
    } else {
      navigate('/login');
    }
  }, [success, orderId, token, navigate, clearCart]);

  return <div style={{ textAlign: "center", marginTop: "100px" }}>Verifying payment...</div>;
};

export default Varify;
