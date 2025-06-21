import React from 'react';
import './Footer.css';
import footer_logo from '../asset/logo_big.png';
import instagram_icon from '../asset/instagram_icon.png';
import twitter_icon from '../asset/twitter.png';
import whatsapp_icon from '../asset/whatsapp_icon.png';

const Footer = () => {
  return (
    <footer className='footer py-5'>
      <div className='container'>
        <div className='row align-items-center justify-content-between text-center text-md-start'>

          <div className='col-12 col-md-4 mb-4 mb-md-0 footer-logo d-flex align-items-center justify-content-center justify-content-md-start'>
            <img src={footer_logo} alt="logo" className='footer-logo-img me-3' />
            <p className='mb-0 brand-name'>Sopping</p>
          </div>

          <div className='col-12 col-md-4 mb-4 mb-md-0'>
            <ul className='footer-links d-flex justify-content-center justify-content-md-between flex-wrap mb-0 ps-0'>
              <li>Company</li>
              <li>Products</li>
              <li>About</li>
              <li>Contact</li>
            </ul>
          </div>

          <div className='col-12 col-md-4 d-flex justify-content-center justify-content-md-end'>
            <div className='footer-social-icon d-flex gap-3'>
              <div className='footer-icon-container'>
                <img src={instagram_icon} alt='Instagram' />
              </div>
              <div className='footer-icon-container'>
                <img src={twitter_icon} alt='Twitter' />
              </div>
              <div className='footer-icon-container'>
                <img src={whatsapp_icon} alt='WhatsApp' />
              </div>
            </div>
          </div>
        </div>

        <div className='footer-copyright mt-5'>
          <hr />
          <p className='text-center mb-0'>&copy; 2025 - All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
