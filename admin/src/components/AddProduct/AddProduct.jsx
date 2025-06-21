import React, { useState } from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.jpg' 


const AddProduct = () => {
  const [image,setImage]=useState(false);
  const [productDetails,setProductDetails]=useState({
    name:"",
    image:"",
    category:"women",
    price:""
  })
  const imageHandler=(e)=>{
    setImage(e.target.files[0]);
  } 

  const changeHandler=(e)=>{
    setProductDetails({...productDetails,[e.target.name]:e.target.value})
  }

  const addProduct=async()=>{
    console.log(productDetails);
    let responseData;
    let product=productDetails;
    let formData=new FormData();
    formData.append('product',image);

    await fetch('http://localhost:4000/upload',{
      method:'POST',
      headers:{
        Accept:'application/json',
      },
      body:formData,
    }).then((resp)=>resp.json()).then((data)=>{responseData=data})
    if(responseData.success)
    {
      product.image=responseData.image_url;
      console.log(product)
      
      await fetch('http://localhost:4000/addproduct',{
        method:'POST',
        headers:{
          Accept:'application/json',
          'Content-Type':'application/json',
        },
        body:JSON.stringify(product),
      }).then((resp)=>resp.json()).then((data)=>{
        data.success?alert("Product Added"):alert("Failed")
      })
    }
  }
   return (
    <div className='add-product'>
      <h1>Add New Product</h1>
      <div className="addproduct-itemfield">
      
        <p>Product Title</p>
        <input value={productDetails.name} onChange={changeHandler} type="text" name="name" id="" placeholder='Type here' required/>
      </div>
        <div className="addproduct-price">
            <dic className="addproduct-itemfield">
                <p>Price</p>
                <input value={productDetails.price} onChange={changeHandler} type="text" placeholder='Type here' name='price' required/>
            </dic>
        </div>
        <div className="addproduct-itemfield">
            <p>Product Category</p>
            <select value={productDetails.category} onChange={changeHandler} name="category" id="" className='add-product-selector' required>
                <option value="women">Women</option>
                <option value="men">Men</option>
                <option value="kid">Kid</option>
            </select>
        </div>
        <div className='addproduct-itemfield'>
            <label htmlFor="file-input">
            <img src={image?URL.createObjectURL(image):upload_area} alt="" className='addproduct-thumnail-img'/>
            </label>
            <input onChange={imageHandler} type="file" name="image" id="file-input" hidden required/>
        </div>
        <button onClick={()=>{addProduct()}} className='addproduct-btn'>ADD</button>
    </div>
  )
}

export default AddProduct
