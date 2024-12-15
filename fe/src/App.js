import React, { useState, useEffect } from 'react';
import Navbar from './components/navbar/Navbar';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import ProductDetail from './components/productDetail/ProductDetail';
import Cart from './components/cart/Cart';
import Login from './components/login/Login';
import Register from './components/register/Register';
import axiosConfig from './api/axiosConfig';

import Admin from './themeAdmin/Admin';
import ProductsAdmin from './themeAdmin/AdminProducts';
import EditProduct from './themeAdmin/EditProduct';
import DashboardUsers from './themeAdmin/DashboardUsers';






import { BrowserRouter } from "react-router-dom";
import Checkout from './components/checkout/Checkout';
import CreateProduct from './themeAdmin/CreateProduct';
import OrderManagement from './themeAdmin/OrderManagement';


import Footer from './components/footer/Footer';
import Search from './components/search/Search';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const getProducts = async () => {
    try {
      const response = await axiosConfig.get("/api/v1/products");
      setProducts(response.data);
    } catch (err) {
      console.log("Error fetching products: ", err);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      if (existingProduct) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }  // Tăng số lượng nếu sản phẩm đã có
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];  // Thêm sản phẩm mới nếu chưa có
      }
    });
  };


  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="App">

      

      


      <Routes>


        <Route path="/home" element={<Home products={products} addToCart={addToCart} />} />




        <Route path="/product/:id" element={<ProductDetail products={products} addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />

        <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/products" element={<ProductsAdmin />} />

        <Route path="/createProduct" element={<CreateProduct />} />
        <Route path="/editProduct/:id" element={<EditProduct products={products} />} />
        <Route path="/users" element={<DashboardUsers />} />
        <Route path="/orders" element={<OrderManagement />} />


        {/* Truyền giỏ hàng và tổng tiền sang trang thanh toán */}
        <Route path="/checkout" element={<Checkout cart={cart} total={calculateTotal()} />} />

        <Route path="/search" element={<Search products={products} addToCart={addToCart} />} />
      </Routes>



    </div>
  );
}

export default App;
