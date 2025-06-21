import React from 'react'
import './Breadcrum.css'
import arrow_icon from '../asset/breadcrum_arrow.png'
import { Link } from 'react-router-dom';

const Breadcrum = (props) => {
    const {product}=props;
  return (
    <div className='breadcrum'>
    <Link to="/">SHOP  </Link>  <img src={arrow_icon} alt="" />
   <Link to={
  product.category === 'men' ? '/men' :
  product.category === 'women' ? '/women' :
  product.category === 'kid' ? '/kids' :
  '/'
}>
  {product.category}
</Link>
    
    <img src={arrow_icon} alt="" /> {product.name}
    </div>
  )
}

export default Breadcrum
