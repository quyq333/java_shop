import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosConfig from "../api/axiosConfig";
import './Css/EditProduct.css'; // Import file CSS

function EditProduct({ products }) {
    const { id } = useParams(); // Lấy id từ URL
    const navigate = useNavigate();
    // const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [product, setProduct] = useState({
        id: "",
        productId: "",
        title: "",
        type: "",
        releaseDate: "",
        poster: "",
        image: ["", "", ""],
        status: "",
        color: "",
        price: 0,
        quantity: 0
    });

    useEffect(() => {
        const localProduct = products.find((p) => p.id == Number(id));
        if (localProduct) {
            setProduct(localProduct);
            setLoading(false);
        } else {
            const fetchProduct = async () => {
                try {
                    const response = await axiosConfig.get(`/api/v1/products/${id}`);
                    setProduct(response.data);
                } catch (err) {
                    setError("Không thể tải sản phẩm. Hãy thử lại!");
                    console.error("Error fetching product:", err);
                } finally {
                    setLoading(false);
                }
            };
            fetchProduct();
        }
    }, [id, products]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosConfig.put(`/api/v1/products/${id}`, product);
            alert("Cập nhật sản phẩm thành công!");
            navigate("/products"); // Điều hướng về danh sách sản phẩm
        } catch (err) {
            console.error("Error updating product:", err);
            alert("Cập nhật thất bại. Vui lòng thử lại!");
        }
    };

    if (loading) return <p>Đang tải...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="edit-product-container">
            <h2 className="form-title">Chỉnh sửa sản phẩm</h2>
            <form onSubmit={handleSubmit} className="product-form">
                <div className="form-group">
                    <label>ID Sản phẩm:</label>
                    <input
                        type="text"
                        name="id"
                        value={product.id || ""}
                        disabled // Không cho phép chỉnh sửa ID
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Product Id:</label>
                    <input
                        type="text"
                        name="productId"
                        value={product.productId || ""}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Tên sản phẩm:</label>
                    <input
                        type="text"
                        name="title"
                        value={product.title || ""}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Loại sản phẩm:</label>
                    <input
                        type="text"
                        name="type"
                        value={product.type || ""}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Ngày phát hành:</label>
                    <input
                        type="date"
                        name="releaseDate"
                        value={product.releaseDate || ""}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Poster URL:</label>
                    <input
                        type="text"
                        name="poster"
                        value={product.poster || ""}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Image 1 URL:</label>
                    <input
                        type="text"
                        name="image1"
                        value={product.image[0] || ""}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Image 2 URL:</label>
                    <input
                        type="text"
                        name="image2"
                        value={product.image[1] || ""}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Image 3 URL:</label>
                    <input
                        type="text"
                        name="image3"
                        value={product.image[2] || ""}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Trạng thái:</label>
                    <input
                        type="text"
                        name="status"
                        value={product.status || ""}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Màu sắc:</label>
                    <input
                        type="text"
                        name="color"
                        value={product.color || ""}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Giá:</label>
                    <input
                        type="number"
                        name="price"
                        value={product.price || ""}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Số lượng:</label>
                    <input
                        type="number"
                        name="quantity"
                        value={product.quantity || ""}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                </div>
                <button type="submit" className="btn btn-primary">Lưu thay đổi</button>
            </form>
        </div>
    );
}

export default EditProduct;
