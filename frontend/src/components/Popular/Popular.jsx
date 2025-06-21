import React, { useEffect, useState } from 'react';
import './Popular.css';
// import data_product from '../asset/data';
import Item from '../Item/Item';

const Popular = () => {

  const [popularproducts,setPopular_Products]= useState([]);
  
    useEffect(()=>{
      fetch('http://localhost:4000/popularinwomen')
       .then((response)=>response.json())
          .then((data)=>setPopular_Products(data));
    },[])

  return (
    <div className='popular container py-5'>
      <h1 className='text-center popular-heading'>POPULAR IN WOMEN</h1>
      <hr className='mx-auto popular-hr' />
      <div className='row popular-item mt-5 gy-4'>
        {popularproducts.map((item, i) => (
          <div key={i} className='col-12 col-sm-6 col-md-4 col-lg-3'>
            <div className='item-container'>
              <Item id={item.id} name={item.name} image={item.image} price={item.price} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Popular;
