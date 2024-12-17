import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetail.css'; // Thêm CSS tùy chỉnh
import Navbar from '../navbar/Navbar';

function ProductDetail({ products, addToCart }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [mainImage, setMainImage] = useState("");
    const [formData, setFormData] = useState({
        size: '',
        quantity: 1,
    });

    const product = products.find((p) => p.id === Number(id));
    if (!product) {
        return <p className="not-found">Sản phẩm không tồn tại!</p>;
    }

    useEffect(() => {
        if (mainImage === "" && product.poster) {
            setMainImage(product.poster);
        }
    }, [product, mainImage]);

    const handleImageClick = (image) => {
        setMainImage(image);
    };

    const calculateTotal = () => {
        return product.price * formData.quantity;
    };

    const handleCheckout = () => {
        if (!formData.size || formData.quantity < 1) {
            alert("Vui lòng chọn size và số lượng trước khi thanh toán!");
            return;
        }

        // Thêm sản phẩm vào giỏ hàng trước khi chuyển trang
        addToCart({
            ...product,
            size: formData.size,
            quantity: formData.quantity,
        });

        // Chuyển sang màn hình thanh toán
        navigate('/checkout', {
            state: {
                product,
                formData,
                total: calculateTotal(),
            },
        });
    };

    const handleAddToCart = () => {
        if (!formData.size || formData.quantity < 1) {
            alert("Vui lòng chọn size và số lượng trước khi thêm vào giỏ hàng!");
            return;
        }

        addToCart({
            ...product,
            size: formData.size,
            quantity: formData.quantity,
        });

        alert("Sản phẩm đã được thêm vào giỏ hàng!");
    };

    return (
        <div className="wrapper">
            <Navbar/>
            <div className="product-detail-container">
            <div className="product-main">
                <div className="product-image">
                    <img
                        src={mainImage}
                        alt={product.title}
                        className="product-main-image"
                    />
                </div>
                <div className="product-info">
                    <h1 className="product-title">{product.title}</h1>
                    <p className="product-id">Mã sản phẩm: {product.id}</p>
                    <p className="product-price">Giá: {product.price.toLocaleString()} VND</p>
                    <p className="product-description">{product.description}</p>

                    <div className="form-group">
                        <label>Chọn size:</label>
                        <select
                            className="form-control"
                            value={formData.size}
                            onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                        >
                            <option value="">Chọn size</option>
                            <option value="L">L</option>
                            <option value="M">M</option>
                            <option value="XL">XL</option>
                            <option value="XXL">XXL</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Số lượng:</label>
                        <input
                            type="number"
                            className="form-control"
                            value={formData.quantity}
                            min="1"
                            onChange={(e) => setFormData({ ...formData, quantity: Math.max(1, parseInt(e.target.value)) })}
                        />
                    </div>

                    <div className="action-buttons">
                        <button className="btn btn-primary" onClick={handleCheckout}>
                            Thanh toán
                        </button>
                        <button className="btn btn-success" onClick={handleAddToCart}>
                            Thêm vào giỏ hàng
                        </button>
                    </div>
                </div>
            </div>

            <div className="product-thumbnails">
                {product.image && product.image.length > 0 ? product.image.slice(0, 4).map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`${product.title} ${index + 1}`}
                        className={`thumbnail ${mainImage === image ? 'active' : ''}`}
                        onClick={() => handleImageClick(image)}
                    />
                )) : <p>No additional images available.</p>}
            </div>
        </div>
        </div>
        
    );
}

export default ProductDetail;
