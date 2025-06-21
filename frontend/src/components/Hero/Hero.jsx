import React from 'react';
import './Hero.css';
import hand_icon from '../asset/hand_icon.png';
import arrow_icon from '../asset/arrow.png';
import hero_image from '../asset/hero_image.png';
import { ShopContext } from '../../context/ShopContext';
import {useContext } from 'react';


const Hero = ({onScrollToNew}) => {
   const {navigate}=useContext(ShopContext);
  return (
    <div className="hero container-fluid">
      <div className='hero_con'>
      <div className="row align-items-center" >
        {/* Left */}
        <div className="hero-left col-lg-6 col-md-12 px-lg-5 px-4 text-center text-lg-start">
          <h2 className="hero-subtitle">NEW ARRIVALS ONLY</h2>

          <div className="hero-title-group">
            <div className="hero-hand-icon">
              <p className="hero-new-tag">new</p>
              <img src={hand_icon} alt="hand icon" />
            </div>
            <h1 className="hero-title">Collections</h1>
            <h1 className="hero-title hero-title-secondary">for everyone</h1>
          </div>

          <button className="hero-btn mt-4" onClick={onScrollToNew}>
            Latest Collections <img src={arrow_icon} alt="arrow icon" />
          </button>
        </div>

        {/* Right */}
        <div className="hero-right col-lg-6 col-md-12 text-center mt-4 mt-lg-0">
          <div className="hero-img-wrapper">
            <img src={hero_image} alt="hero" className="hero-image" />
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Hero;
