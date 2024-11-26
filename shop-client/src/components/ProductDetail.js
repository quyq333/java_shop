import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ProductDetail({ products, addToCart }) {
    const { id } = useParams();
    const navigate = useNavigate(); // Hook để điều hướng
    const [mainImage, setMainImage] = useState("");
    const [formData, setFormData] = useState({
        size: '',
        quantity: 1,
    });

    const product = products.find((p) => p.id === Number(id));
    if (!product) {
        return <p>Product not found!</p>;
    }

    // Cập nhật hình ảnh chính khi tải sản phẩm
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
        <div className="container mt-4">
            <div className="row">
                {/* Phần ảnh chính */}
                <div className="col-md-6">
                    <img
                        src={mainImage}
                        alt={product.title}
                        className="img-fluid rounded shadow-sm"
                        style={{ objectFit: 'contain' }}
                    />
                </div>

                {/* Phần thông tin sản phẩm */}
                <div className="col-md-6">
                    <h1>{product.title}</h1>
                    <p><strong>Mã sản phẩm:</strong> {product.id}</p>
                    <p><strong>Giá:</strong> {product.price} VND</p>
                    <p><strong>Mô tả:</strong> {product.description}</p>

                    {/* Chọn Size */}
                    <div className="mb-3">
                        <label htmlFor="size" className="form-label">Chọn size</label>
                        <select
                            className="form-select"
                            id="size"
                            name="size"
                            value={formData.size}
                            onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                            required
                        >
                            <option value="">Chọn size</option>
                            <option value="L">L</option>
                            <option value="M">M</option>
                            <option value="XL">XL</option>
                            <option value="XXL">XXL</option>
                        </select>
                    </div>

                    {/* Số lượng */}
                    <div className="mb-3">
                        <label htmlFor="quantity" className="form-label">Số lượng</label>
                        <input
                            type="number"
                            className="form-control"
                            id="quantity"
                            name="quantity"
                            value={formData.quantity}
                            onChange={(e) => setFormData({ ...formData, quantity: Math.max(1, parseInt(e.target.value)) })}
                            required
                            min="1"
                        />
                    </div>

                    {/* Nút hành động */}
                    <div className="d-flex gap-3 mt-4">
                        <button
                            className="btn btn-primary"
                            onClick={handleCheckout}
                        >
                            Thanh toán
                        </button>
                        <button
                            className="btn btn-success"
                            onClick={handleAddToCart}
                        >
                            Thêm vào giỏ hàng
                        </button>
                    </div>
                </div>
            </div>

            {/* Phần ảnh nhỏ */}
            <div className="row mt-4">
                <div className="col-12 d-flex justify-content-start gap-2">
                    {product.image && product.image.length > 0 ? product.image.slice(0, 4).map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`${product.title} ${index + 1}`}
                            className="img-thumbnail"
                            onClick={() => handleImageClick(image)}
                            style={{
                                cursor: 'pointer',
                                width: '30%',
                                height: 'auto',
                                objectFit: 'cover',
                                transition: 'transform 0.3s ease',
                                borderRadius: '5px',
                            }}
                        />
                    )) : <p>No additional images available.</p>}
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
