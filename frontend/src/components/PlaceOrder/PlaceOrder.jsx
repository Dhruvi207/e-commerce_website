import React, { useContext, useState } from 'react'
import './PlaceOrder.css'
import CartItems from '../CartItems/CartItems'
import CartTotal from '../CartItems/CartTotal'
import stripe_logo from '../asset/Stripe-Logo.png';
import { ShopContext } from '../../context/ShopContext';
import { data } from 'react-router-dom';



const PlaceOrder = () => {
    const [method, setMethod] = useState('cod');
     const {clearCart, navigate,getTotalCartItems,getTotalCartAmount,all_product,cartItems} = useContext(ShopContext);

    const [formdata, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: ''
    })

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value

        setFormData(data => ({ ...data, [name]: value }))
    }

    const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
        const orderItems = [];

        for (const itemId in cartItems) {
            if (cartItems[itemId] > 0) {
                const itemInfo = structuredClone(
                    all_product.find(product => product.id === Number(itemId))
                );

                if (itemInfo) {
                    itemInfo.quantity = cartItems[itemId];
                    orderItems.push(itemInfo);
                }
            }
        }

        // console.log(orderItems); // final result
       const token = localStorage.getItem('auth-token');

let orderData = {
    address: formdata,
    items: orderItems,
    amount: getTotalCartAmount()
};

switch (method) {

    //API call for COD
    case 'COD':
        try {
            const response = await fetch('http://localhost:4000/placeorder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('auth-token')
                },
                body: JSON.stringify(orderData)
            });
            console.log(response.data);
            const data = await response.json();

            if (data.success) {
                clearCart();
                navigate('/orders');
            } else {
                alert('Error placing order');
            }
        } catch (error) {
            console.error('Order placement failed:', error);
            alert('Something went wrong. Please try again.');
        }
        break;

        case 'stripe':
            const responseStripe=await fetch('http://localhost:4000/placeOrderStripe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('auth-token'),
        'origin': window.location.origin
                },
                body: JSON.stringify(orderData)
            });
             const data = await responseStripe.json();
            console.log(data);
            

            if (data.success) {
                const{session_url}=data;
                window.location.replace(session_url);
                
                
            }
            else{
                alert("There is a problem in stripe")
            }
            break;

            default:
                break;
        }

    } catch (error) {
        console.error("Error preparing order items:", error);
    }
};

   
    return (
        <form onSubmit={onSubmitHandler} className='placeorder'>
            {/* Left Side */}
            <div className="placeorder-left">
                <div className="inside-left">
                    <div className="placeorder-title">
                        <h1>Delivery Information</h1>

                    </div>
                    <div className="placeorder-txt">
                        <input onChange={onChangeHandler} name='firstname' value={formdata.firstname} type="text" placeholder='First name' required />
                        <input onChange={onChangeHandler} name='lastname' value={formdata.lastname} type="text" placeholder='Last name' required />
                    </div>

                    <input onChange={onChangeHandler} name='email' value={formdata.email} type="email" placeholder='Email Address' className='input-fields' required />
                    <input onChange={onChangeHandler} name='street' value={formdata.street} type="text" placeholder='Street' className='input-fields' required />

                    <div className="placeorder-txt">
                        <input onChange={onChangeHandler} name='city' value={formdata.city} type="text" placeholder='City' required />
                        <input onChange={onChangeHandler} name='state' value={formdata.state} type="text" placeholder='State' required />

                    </div>
                    <div className="placeorder-txt">
                        <input onChange={onChangeHandler} name='zipcode' value={formdata.zipcode} type="text" placeholder='Zipcode' required />
                        <input onChange={onChangeHandler} name='country' value={formdata.country} type="text" placeholder='Countery' required />

                    </div>
                    <input onChange={onChangeHandler} name='phone' value={formdata.phone} type="number" placeholder='Phone' className='input-fields' required />
                </div>
            </div>

            {/* Right side */}
            <div className="placeorder-right">

                <div className="placeorder-total">
                    <CartTotal />
                </div>


            </div>
            <div className="placeorder-right-title">
                <div className='inside-payment'>
                    <h2>Payment Method</h2>
                    <div className='payment-method'>
                        {/* <input type="radio" checked />
                        {/* <p className='stripe'></p> 
                        <img src={stripe_logo} alt="" /> */}
                        <div onClick={() => setMethod('stripe')} className='payment-type'>
                            <p className={` ${method === 'stripe'?'middle-txt ':''}`}></p>
                            <img src={stripe_logo} alt="" />
                        </div>
                        <div onClick={() => setMethod('COD')} className='payment-type'>
                            <p className={` ${method === 'COD'?'middle-txt ':''}`}></p>Cash on delivery</div>
                    </div>
                    <div className='right-btn'>
                        <button type='submit' className='btn1'>Place Order</button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default PlaceOrder
