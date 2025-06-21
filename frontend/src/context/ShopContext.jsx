import React, { createContext, useEffect, useState } from "react";
// import all_product from "../components/asset/all_product";
import {useNavigate} from "react-router-dom";

const backendurl=process.env.REACT_APP_backendurl;
const token=process.env.REACT_APP_token;

export const ShopContext = createContext(null);
// This function is used to diplay default cart data when cart is empty
const getDefaultCart=()=>{
        let cart={};
        for (let index = 0; index < 300+1; index++) {
            cart[index]=0;
           
        }
         return cart;
    }
    // Ends here
     
    // Is is used for remove and add items in cart means if user add or remove items how will cart page react
const ShopContextProvider=(props)=>{
    
    const [all_product,setAll_Product]=useState([]);

    const [cartItems,setCartItems]=useState(getDefaultCart());

    const navigate=useNavigate();
  
    useEffect(()=>{
        fetch('http://localhost:4000/allproducts')
        .then((response)=>response.json())
        .then((data)=>setAll_Product(data))

        if(localStorage.getItem('auth-token'))
        {
            fetch('http://localhost:4000/getcart',{
            method:'POST',
            headers:{
                Accept:'application/form-data',
                'auth-token':`${localStorage.getItem('auth-token')}`,
                'Content-Type':'application/json',
            },
            body:"",

        }).then((response)=>response.json())
        .then((data)=>setCartItems(data));
        }

    },[])


    const refreshCart = () => {
  const token = localStorage.getItem('auth-token');
  if (token) {
    fetch('http://localhost:4000/getcart', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'auth-token': token,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Cart refreshed:', data);
        setCartItems(data);
      })
      .catch((err) => console.error('Cart refresh error:', err));
  }
};

    
   const addtocart = (itemId) => {
  if (localStorage.getItem('auth-token')) {
    fetch('http://localhost:4000/addtocart', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'auth-token': localStorage.getItem('auth-token'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ itemId }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Add to cart response:", data);
        refreshCart(); // ✅ Immediately re-fetch updated cart
      })
      .catch((err) => console.error("Error adding to cart:", err));
  }
};


     const removefromcart=(itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if(localStorage.getItem('auth-token'))
        {
             fetch('http://localhost:4000/removefromcart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"itemId":itemId}),
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data));
        }
    }

    // ends here

    // It is used for subtotal means total of all items added in cart
    const getTotalCartAmount = () => {
  let totalamount = 0;
  for (const item in cartItems) {
    if (cartItems[item] > 0) {
      const iteminfo = all_product.find(
        (product) => product.id === Number(item)
      );

      if (iteminfo) {
        totalamount += iteminfo.price * cartItems[item];
      } else {
        console.warn(`Product not found for item ID: ${item}`);
      }
    }
  }
  return totalamount;
};

    // Ends here

    const getTotalCartItems=()=>{
        let totalitem=0;
        for(const item in cartItems)
        {
            if(cartItems[item]>0)
            {
                totalitem += cartItems[item];
            }
        }
        return totalitem;
    }

   // clearing whole cart when all cart items move to orders
const clearCart = () => {
    // Clear cart locally
    const emptyCart = {};
    for (let index = 0; index <= 300; index++) {
        emptyCart[index] = 0;
    }
    setCartItems(emptyCart);

    // Clear cart on backend if user is authenticated
    
    const token = localStorage.getItem('auth-token');
    if (token) {
        fetch('http://localhost:4000/clearcart', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'auth-token': token
            },
            body: JSON.stringify({})
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to clear cart on server');
            }
            return response.text(); // since your backend sends plain text ("Cart cleared")
        })
        .then((data) => console.log('Cart cleared:', data))
        .catch((error) => console.error('Error clearing cart:', error));
    }
};


      const contextValue={backendurl,token,clearCart,getTotalCartItems,getTotalCartAmount,all_product,cartItems,addtocart,removefromcart,navigate,refreshCart,};
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )

}
export default ShopContextProvider;