import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function ProductDetail({ products, addToCart }) {
    const { id } = useParams(); // Lấy id từ URL
    const [mainImage, setMainImage] = useState(""); // Quản lý ảnh chính
    const [isCheckout, setIsCheckout] = useState(false); // Quản lý trạng thái thanh toán
    const [formData, setFormData] = useState({
        size: '',
        quantity: 1,
        address: '',
        phone: '',
        paymentMethod: 'COD',
    });

    // Tìm sản phẩm bằng ID
    const product = products.find((p) => p.id === Number(id));

    if (!product) {
        return <p>Product not found!</p>;
    }

    const images = product.image && Array.isArray(product.image) ? product.image.slice(0, 4) : [];

    if (mainImage === "") {
        setMainImage(product.poster);
    }

    const handleImageClick = (image) => {
        setMainImage(image);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'quantity' ? Math.max(1, parseInt(value)) : value, // Đảm bảo số lượng >= 1
        });
    };

    const handleCheckout = () => {
        setIsCheckout(true);
    };

    const calculateTotal = () => {
        return product.price * formData.quantity;
    };

    const handlePayment = () => {
        if (!formData.size || !formData.address || !formData.phone) {
            alert("Vui lòng điền đầy đủ thông tin trước khi thanh toán!");
            return;
        }

        alert(`Thanh toán thành công!
        \nSản phẩm: ${product.title}
        \nSize: ${formData.size}
        \nSố lượng: ${formData.quantity}
        \nTổng tiền: ${calculateTotal()} VND
        \nĐịa chỉ: ${formData.address}
        \nSố điện thoại: ${formData.phone}
        \nPhương thức thanh toán: ${formData.paymentMethod}`);
        setIsCheckout(false);
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
                            onChange={handleInputChange}
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
                            onChange={handleInputChange}
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
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>

            {/* Phần ảnh nhỏ */}
            <div className="row mt-4">
                <div className="col-12 d-flex justify-content-start gap-2">
                    {images.length > 0 ? images.map((image, index) => (
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

            {/* Form Thanh toán */}
            {isCheckout && (
                <div className="mt-4">
                    <h2>Thông tin Thanh toán</h2>
                    <form>
                        {/* Địa chỉ */}
                        <div className="mb-3">
                            <label htmlFor="address" className="form-label">Địa chỉ</label>
                            <input
                                type="text"
                                className="form-control"
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        {/* Số điện thoại */}
                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label">Số điện thoại</label>
                            <input
                                type="text"
                                className="form-control"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        {/* Phương thức thanh toán */}
                        <div className="mb-3">
                            <label htmlFor="paymentMethod" className="form-label">Phương thức thanh toán</label>
                            <select
                                className="form-select"
                                id="paymentMethod"
                                name="paymentMethod"
                                value={formData.paymentMethod}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="COD">Thanh toán khi nhận hàng</option>
                                <option value="Credit Card">Thẻ tín dụng</option>
                                <option value="Online Banking">Chuyển khoản</option>
                            </select>
                        </div>

                        {/* Tổng tiền */}
                        <p><strong>Tổng tiền:</strong> {calculateTotal()} VND</p>

                        {/* Nút xác nhận */}
                        <button
                            type="button"
                            className="btn btn-success"
                            onClick={handlePayment}
                        >
                            Xác nhận Thanh toán
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default ProductDetail;
