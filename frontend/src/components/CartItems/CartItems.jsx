import React, { useContext } from 'react'
import './CartItems.css'
import { ShopContext } from '../../context/ShopContext'
import remove_icon from '../asset/cart_cross_icon.png'
import CartTotal from './CartTotal'

const CartItems = () => {
    const { all_product, cartItems, removefromcart,navigate } = useContext(ShopContext);
    return (
     
        <div className='cartitems'>
             
            <div className="cartitems-format-main disable">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            {/* <hr /> */}
            {all_product.map((e) => {
                if (cartItems[e.id] > 0) 
                {
                    return <div>
                        <div className="cartitems-format cartitems-format-main">
                            <img src={e.image} alt="" className='carticon-product-icon' />
                           
                            <p>{e.name}</p>
                            <p>Rs.{e.price}</p>
                            <button className='cartitems-qty'>{cartItems[e.id]}</button>
                          <p className="cartitems-total-price">Rs.{e.price * cartItems[e.id]}</p>
                        
                            <img className='cartitems-remove-icon' src={remove_icon} onClick={() => { removefromcart(e.id) }} alt="" />
                            
                        </div>
                        {/* <hr /> */}
                    </div>
                }
                return null;
            })}

           <CartTotal/>
          {localStorage.getItem('auth-token')?
         ( <button onClick={()=>navigate('/place-order')} className='cartitems-total-btn'>Proceed to checkout</button>)
        :(<button onClick={()=>navigate('/login')} className='cartitems-total-btn'>Proceed to checkout</button>)}
             
            
          
            
           
        </div>
        
    )
}

export default CartItems