import React, { useState, useEffect, useMemo } from 'react';
import { Routes, Route, useLocation, BrowserRouter, Navigate } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import axiosConfig from './api/axiosConfig';
import Home from './components/home/Home';
import ProductDetail from './components/productDetail/ProductDetail';
import Cart from './components/cart/Cart';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Admin from './themeAdmin/Admin';
import ProductsAdmin from './themeAdmin/AdminProducts';
import CreateProduct from './themeAdmin/CreateProduct';
import EditProduct from './themeAdmin/EditProduct';
import DashboardUsers from './themeAdmin/DashboardUsers';
import OrderManagement from './themeAdmin/OrderManagement';
import Checkout from './components/checkout/Checkout';
import Search from './components/search/Search';
import './App.css';

function App() {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosConfig.get('/api/v1/products');
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const getCart = async (userId) => {
    try {
      console.log("Fetching cart for user:", userId);
      const response = await fetch(`http://localhost:8080/api/v1/${userId}/cart`);

      if (!response.ok) {
        const errorDetails = await response.text(); // Lấy thông tin lỗi từ backend
        console.error("Server responded with:", errorDetails);
        throw new Error("Failed to fetch cart");
      }

      const cartData = await response.json();
      console.log("Fetched cart data:", cartData);
      setCart(cartData);
    } catch (error) {
      console.error("Error fetching cart:", error.message);
    }
  };


  useEffect(() => {
    const userId = localStorage.getItem("userId");
    // const userRole = localStorage.getItem("userRole");
    // if (userId && userRole) {
    //   setIsAuthenticated[true] = true;
    // }
    if (userId) {
      getCart(userId);
    }
  }, []);

  const addToCart = async (product) => {
    const userId = localStorage.getItem("userId");
    console.log("User ID:", userId);

    if (!userId) {
      alert("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng!");
      return;
    }

    setCart((prevCart) => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      if (existingProduct) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });

    try {
      const cartItem = { id: product.id, quantity: 1, title: product.title, price: product.price, poster: product.poster };
      const response = await fetch(`http://localhost:8080/api/v1/${userId}/cart`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cartItem),
      });
      if (!response.ok) {
        throw new Error("Failed to update cart");
      }
      getCart(userId);
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const total = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  function ProtectedRoute({ children, requiredRole }) {
    const userRole = localStorage.getItem("userRole");
    const userId = localStorage.getItem("userId");

    if (!userId || userRole !== requiredRole) {
      alert("Bạn không có quyền truy cập vào trang này.");
      return <Navigate to="/home" />;
    }

    return children;
  }


  return (
    <div className="App">
      
     
      <Routes>
        <Route path="/home" element={<Home products={products} addToCart={addToCart} />} />
        <Route path="/product/:id" element={<ProductDetail products={products} addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
        <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} setCart={setCart} getCart={getCart} />} />
        <Route path="/register" element={<Register />} />
        {/* Route yêu cầu userRole là "ADMIN" */}
        <Route path="/admin" element={<ProtectedRoute requiredRole="ADMIN"><Admin /></ProtectedRoute>} />
        <Route path="/products" element={<ProtectedRoute requiredRole="ADMIN"><ProductsAdmin /></ProtectedRoute>} />
        <Route path="/createProduct" element={<ProtectedRoute requiredRole="ADMIN"><CreateProduct /></ProtectedRoute>} />
        <Route path="/editProduct/:id" element={<ProtectedRoute requiredRole="ADMIN"><EditProduct products={products} /></ProtectedRoute>} />
        <Route path="/users" element={<ProtectedRoute requiredRole="ADMIN"><DashboardUsers /></ProtectedRoute>} />
        <Route path="/orders" element={<ProtectedRoute requiredRole="ADMIN"><OrderManagement /></ProtectedRoute>} />


        <Route path="/checkout" element={<Checkout cart={cart} total={total} />} />
        <Route path="/search" element={<Search products={products} addToCart={addToCart} />} />
      </Routes>

    
      
    </div>
  );
}

export default App;