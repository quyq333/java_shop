
import React, { useState } from 'react';
import Css from './template/CssAdmin';
import Navbar from './template/NavbarAdmin';
import Sidebar from './template/SidebarAdmin';
import Footer from './template/FooterAdmin';
import './Css/CreateProduct.css';
import axiosConfig from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';


function CreateProduct() {
    // Sử dụng useState để lưu giá trị từ form
    const [formData, setFormData] = useState({
        productId: '',
        title: '',
        type: '',
        description: '',
        releaseDate: '',
        poster: '',
        status: '',
        color: '',
        price: '',
        quantity: '',
        images: ['', '', ''],
    });
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log('Form data to be submitted:', formData.images);
        try {
            // Gửi dữ liệu lên backend (Giả sử backend API là /api/v1/products/create)
            const response = await fetch('http://localhost:8080/api/v1/products/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            // const responseData = await response.json();
                // console.log("Response from backend:", responseData); // Kiểm tra dữ liệu phản hồi
            if (response.ok) {
                // Hiển thị thông báo thành công
                alert('Product added successfully!');
                // Chuyển hướng đến màn hình hiển thị sản phẩm
                navigate('/products');  // Địa chỉ của màn hình hiển thị sản phẩm
            } else {
                // Hiển thị thông báo lỗi nếu có
                alert('Failed to add product!');
            }
        } catch (error) {
            // Xử lý lỗi
            console.error('Error adding product:', error);
            alert('An error occurred!');
        }
    };

    return (
        <div>
            <Css />

            <div className="wrapper">
                <Navbar />
                <Sidebar />

                {/* Content Wrapper */}
                <div className="content-wrapper">
                    {/* Page Header */}
                    <div className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1 className="m-0">Create New Product</h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                                        <li className="breadcrumb-item active">Create Product</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <section className="content">
                        <div className="container-fluid">
                            <div className="row justify-content-center">
                                <div className="col-lg-10">
                                    <div className="card card-primary">
                                        <div className="card-header">
                                            <h3 className="card-title">Product Information</h3>
                                        </div>
                                        <form onSubmit={handleSubmit}>
                                            <div className="card-body">
                                                {[
                                                    { name: "id", label: "ID", type: "text" },
                                                    { name: "productId", label: "Product ID", type: "text" },
                                                    { name: "title", label: "Title", type: "text" },
                                                    { name: "type", label: "Type", type: "text" },
                                                    { name: "description", label: "Description", type: "text" },
                                                    { name: "releaseDate", label: "Release Date", type: "date" },
                                                    { name: "poster", label: "Poster URL", type: "text" },
                                                    { name: "status", label: "Status", type: "text" },
                                                    { name: "color", label: "Color", type: "text" },
                                                    { name: "price", label: "Price (VND)", type: "number" },
                                                    { name: "quantity", label: "Quantity", type: "number" },
                                                ].map((field) => (
                                                    <div key={field.name} className="form-group">
                                                        <label htmlFor={field.name}>{field.label}</label>
                                                        <input
                                                            type={field.type}
                                                            className="form-control"
                                                            id={field.name}
                                                            name={field.name}
                                                            value={formData[field.name]|| ''}
                                                            onChange={handleChange}
                                                            placeholder={`Enter ${field.label.toLowerCase()}`}
                                                        />
                                                    </div>
                                                ))}

                                                {/* Input for images */}
                                                <div className="form-group">
                                                    <label>Images</label>
                                                    {formData.images.map((image, index) => (
                                                        <input
                                                            key={index}
                                                            type="text"
                                                            className="form-control mb-2"
                                                            placeholder={`Image URL ${index + 1}`}
                                                            value={formData[image]}
                                                            onChange={(e) => {
                                                                const newImages = [...formData.images];
                                                                newImages[index] = e.target.value;
                                                                setFormData({ ...formData, image: newImages });
                                                            }}
                                                        />
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="card-footer">
                                                <button type="submit" className="btn btn-primary">Submit</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <Footer />
                <aside className="control-sidebar control-sidebar-dark">
                    {/* Optional sidebar content */}
                </aside>
            </div>
        </div>
    );
}

export default CreateProduct;
