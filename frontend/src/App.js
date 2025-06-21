
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Routes,Route } from 'react-router-dom';
import ShopCategory from './pages/ShopCategory';
import Shop from './pages/Shop';
import Product from './pages/Product';
import Cart from './pages/Cart';
import LoginSignup from './pages/LoginSignup';
import Verify from './pages/Varify';
import Footer from './components/Footer/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import PlaceOrder from './components/PlaceOrder/PlaceOrder';
import Orders from './components/Orders/Orders';

function App() {
  return (
    <div style={{ flex:1 }}>
      
      <Navbar/>
      <Routes>
        <Route path="/" element={<Shop/>}></Route>
        <Route path="/men" element={<ShopCategory category="men"/>}/>
        <Route path="/women" element={<ShopCategory category="women"/>}/>
        <Route path="/kids" element={<ShopCategory category="kid"/>}/>
        <Route path="/product" element={<Product/>}>
          <Route path=':productId' element={<Product/>}/>
        </Route>
         <Route path="/cart" element={<Cart/>}/>
         <Route path="/login" element={<LoginSignup/>}/>
         <Route path="/place-order" element={<PlaceOrder/>}/>
         <Route path="/orders" element={<Orders/>}/>
         <Route path="/verify" element={<Verify/>}/>
      </Routes>
       <Footer/>
   
     
    </div>
  );
}
export default App;
