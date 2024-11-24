import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Login from './components/Login';
import Register from './components/Register';
import api from './api/axiosConfig';
import Admin from './components/Admin';
import { BrowserRouter } from "react-router-dom";


function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const getProducts = async () => {
    try {
      const response = await api.get("/api/v1/products");
      setProducts(response.data);
    } catch (err) {
      console.log("Error fetching products: ", err);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const addToCart = (product) => {
    setCart((prevCart) => [
      ...prevCart,
      { ...product, quantity: 1 }  // Khởi tạo số lượng hiển thị là 1
    ]);
  };


  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home products={products} addToCart={addToCart} />} />
        <Route path="/product/:id" element={<ProductDetail products={products} addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />

        <Route path="/login" element={<Login setIsAuthenticated={{ setIsAuthenticated }} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin products={products} setProducts={setProducts} />} />

      </Routes>
    </div>
  );
}

export default App;