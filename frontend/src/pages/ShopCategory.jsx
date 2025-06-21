import React, { useContext } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../context/ShopContext';
import Item from '../components/Item/Item';

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);

  const filteredProducts = all_product.filter(
    (item) => item.category === props.category
  );

  return (
    <div className="shop-category container py-5">
     
     
      <div className="row shop-category-items  gy-4" >
        {filteredProducts.map((item, i) => (
          <div key={i} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="item-container">
              <Item
                id={item.id}
                name={item.name}
                image={item.image}
                price={item.price}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopCategory;
