import React from 'react'
import './Admin.css'
import Sidebar from '../../components/Sidebar/Sidebar'
import { Routes,Route } from 'react-router-dom'
import AddProduct from '../../components/AddProduct/AddProduct'
import ListProduct from '../../components/ListProduct/ListProduct'
import TotalOrders from '../../components/TotalOrders/TotalOrders'
import DashBoard from '../../components/DashBoard/DashBoard'

const Admin = () => {
  return (
    <div className='admin'>
      <Sidebar/>
      <Routes>
         <Route path='/' element={<DashBoard />} /> 
        <Route path='/addproduct' element={<AddProduct/>}/>
        <Route path='/listproduct' element={<ListProduct/>}/>
        <Route path='/totalorders' element={<TotalOrders/>}/>
      </Routes>
    </div>
  )
}

export default Admin
