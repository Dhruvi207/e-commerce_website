import React, { useState } from 'react';
import './DescriptionBox.css';

const DescriptionBox = () => {
  const [activeTab, setActiveTab] = useState('description');

  return (
    <div className="descriptionbox container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="descriptionbox-tabs d-flex mb-3">
            <div
              className={`descriptionbox-tab ${activeTab === 'description' ? 'active' : ''}`}
              onClick={() => setActiveTab('description')}
            >
              Description
            </div>
            <div
              className={`descriptionbox-tab ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews (122)
            </div>
          </div>

          <div className="descriptionbox-content p-4 rounded shadow-sm">
            {activeTab === 'description' ? (
              <div>
                <p>
                  Discover high-quality fashion made for comfort and elegance. Our garments are
                  crafted with the finest materials and perfect for any occasion.
                </p>
                <p>
                  Whether you're dressing for a casual day or a formal event, our pieces are
                  designed to complement your style and confidence.
                </p>
              </div>
            ) : (
              <div>
                <p>
                  ⭐⭐⭐⭐☆ — “Great quality and fast shipping! Loved how soft the fabric is.”
                </p>
                <p>
                  ⭐⭐⭐⭐⭐ — “This is my second purchase and I'm still impressed. Highly recommend
                  this shop for stylish, comfy clothing.”
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DescriptionBox;
