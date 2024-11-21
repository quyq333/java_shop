
import './App.css';


import api from './api/axiosConfig'

import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './components/Layout';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';


function App() {
  const [products, setProducts] = useState();
  const getProducts = async () => {
    try {
      const response = await api.get("/api/v1/products");
      console.log(response.data);

      setProducts(response.data);

    } catch (err) {
      console.log(err);


    }



  }
  useEffect(() => {
    getProducts();
  }, [])

  return (
    <div className="App">

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} ></Route>

        </Route>
      </Routes>
    </div>
  );
}

export default App;
