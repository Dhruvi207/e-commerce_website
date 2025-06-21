import React from 'react'
import './CartItems.css'
import { ShopContext } from '../../context/ShopContext';
import { useContext } from 'react'

const CartTotal = () => {
       const { getTotalCartAmount,navigate } = useContext(ShopContext);
  return (
     <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1>Cart Total</h1>
                    <div>
                        <div className="cartitems-total-item">
                            <p>Subtotal</p>
                            <p>Rs.{getTotalCartAmount()}</p>
                        </div>
                        <hr className='cart-hr'/>
                        <div className="cartitems-total-item">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                           
                        </div>
                         <hr  className='cart-hr'/>
                         <div className="cartitems-total-item">
                            <h3>Total</h3>
                            <h3>Rs.{getTotalCartAmount()}</h3>
                         </div>
                         
                    </div>
                       
                </div>
                
            </div>
  )
}

export default CartTotal
