import React, { useState } from 'react';
import './CSS/LoginSignup.css';
import { Link } from 'react-router-dom';

const LoginSignup = () => {
  const admin_email=process.env.REACT_APP_ADMIN_EMAIL;
const admin_password=process.env.REACT_APP_ADMIN_PASSWORD;

  const [state,setState]=useState("Login");

  const [formData,setformData]=useState({
    username:"",
    password:"",
    email:""
  })

  const changeHandler=(e)=>{
    setformData({...formData,[e.target.name]:e.target.value})
  }

  const login=async()=>{
    console.log("Login executed",formData);
     let responseData;
    await fetch('http://localhost:4000/login',{
    method:'POST',
    headers:{
      Accept:'application/form-data',
      'Content-Type':'application/json',
      },
        body:JSON.stringify(formData),
    }).then((response)=>response.json()).then((data)=>responseData=data)
    if(responseData.success)
    {
      localStorage.setItem('auth-token',responseData.token);
      if(formData.email === admin_email)
      {
          window.location.replace("http://localhost:3001");
      }
      else
      {
       
        window.location.replace("/");
      }
      
    }
    else
    {
      alert(responseData.errors);
    }
  };

  const signup= async () =>{
    console.log("signup executed",formData);
    let responseData;
    await fetch('http://localhost:4000/signup',{
    method:'POST',
    headers:{
      Accept:'application/form-data',
      'Content-Type':'application/json',
      },
        body:JSON.stringify(formData),
    }).then((response)=>response.json()).then((data)=>responseData=data)
    if(responseData.success)
    {
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace("/");
    }
    else
    {
      alert(responseData.errors);
    }
  }

  return (
    <div className="loginsignup d-flex justify-content-center align-items-center">
      <div className="loginsignup-container shadow">
        <h2 className="text-center mb-4">{state}</h2>

        <div className="loginsignup-fields">

          {state==="Create Account"?<input type="text" placeholder="Full Name" name='username' value={formData.username} onChange={changeHandler} required/>:<></>}
          <input type="email" placeholder="Email Address" name='email' value={formData.email} onChange={changeHandler} required/>
          <input type="password" placeholder="Password" name='password' value={formData.password} onChange={changeHandler} required/>

        </div>

        <button className="signup-btn" onClick={()=>{state==="Login"?login():signup()}}>Continue</button> {/*{state==="Login"?"Log in":"Sign Up"}</button>*/}

        {state==="Create Account"? <p className="loginsignup-login text-center mt-3">
          Already have an account? <span onClick={()=>{setState("Login")}}>Login here</span>
        </p>: <p className="loginsignup-login text-center mt-3">
          Create an account? <span onClick={()=>{setState("Create Account")}}>Click here</span>
        </p>}
       

       
        <div className="loginsignup-agree d-flex ">
          <input type="checkbox" id="agree" />
          <label htmlFor="agree" className="ms-2">
            I agree to the <Link href="#">Terms of Service</Link> and <Link href="#">Privacy Policy</Link>.
          </label>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
