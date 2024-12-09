import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axiosConfig from '../api/axiosConfig';

function ProductsContent() {
  const [products, setProducts] = useState([]);

  // Lấy danh sách sản phẩm
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
  // Xử lí xóa sản phẩm
  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?");
    if (confirmDelete) {
      try {
        const response = await axiosConfig.delete(`/api/v1/products/${productId}`);
        if (response.status === 204) {
          alert('Product deleted successfully!');
          getProducts();  // Gọi lại API để lấy danh sách sản phẩm mới
        } else {
          alert('Failed to delete product!');
        }
      } catch (err) {
        console.error("Error deleting product:", err);
        alert('An error occurred while deleting the product!');
      }
    }
  };




  return (
    <div>
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Dashboard</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item"><a href="#">Home</a></li>
                  <li className="breadcrumb-item active">Quản lý sản phẩm</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <table className="table">
          <thead>
            <th scope='col'>
              <a
                style={{
                  textDecoration: "none",
                  color: "white",
                  backgroundColor: "#4CAF50",
                  padding: "8px 16px",
                  borderRadius: "4px",
                  marginRight: "8px",
                }}
                href="./createProduct">Create</a>
            </th>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Product Id</th>
              <th scope="col">Name</th>
              <th scope="col">Type</th>
              <th scope="col">Release Date</th>
              <th scope="col">Image</th>
              <th scope="col">Status</th>
              <th scope="col">Color</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope='col'>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.productId}</td>
                <td>{product.title}</td>
                <td>{product.type === "1" ? "Giày" : "Áo"}</td>
                <td>{product.releaseDate}</td>
                <td><img style={{ borderRadius: "5px", maxWidth: "100px" }} src={product.poster} alt={product.productId} /></td>
                <td>{product.status}</td>
                <td>{product.color}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td style={{ textAlign: "center", padding: "10px" }}>
                  <Link
                    to={`/editProduct/${product.id}`}
                    style={{
                      textDecoration: "none",
                      color: "white",
                      backgroundColor: "#2196F3",
                      padding: "8px 16px",
                      borderRadius: "4px",
                      marginRight: "8px",
                    }}
                  >
                    Edit
                  </Link>

                  <a
                    style={{
                      textDecoration: "none",
                      color: "white",
                      backgroundColor: "#f44336",
                      padding: "8px 16px",
                      borderRadius: "4px",
                      transition: "background-color 0.3s",
                    }}
                    href="#!"
                    onClick={() => handleDelete(product.id)} // Xử lý xóa khi nhấn Delete
                  >
                    Delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductsContent;
