import React, { useEffect, useState } from 'react';
import './NewCollections.css';
import new_collection from '../asset/new_collections';
import Item from '../Item/Item';

const NewCollections = () => {

  const [new_collection,setNew_collection]=useState([]);

  useEffect(()=>{
    fetch('http://localhost:4000/newcollections')
     .then((response)=>response.json())
        .then((data)=>setNew_collection(data))
  },[])

  return (
    <div className='new-collections container py-5' >
      <h1 className='text-center new-collections-heading'>NEW COLLECTIONS</h1>
      <hr className='mx-auto new-collections-hr' />
      <div className='row new-collections-items mt-5 gy-4'>
        {new_collection.map((item, i) => (
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

export default NewCollections;
