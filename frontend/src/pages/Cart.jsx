import React from 'react'
import CartItems from '../components/CartItems/CartItems'
import { useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useContext, useState } from 'react'


const Cart = () => {
  const { cartItems } = useContext(ShopContext);
  
  useEffect(() => {
  console.log("Cart changed:", cartItems);
}, [cartItems]);
  return (
    <div>
     
      <CartItems/>
    </div>
  )
}

export default Cart
