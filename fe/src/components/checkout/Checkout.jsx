import React, { useState } from 'react';
import './Checkout.css'; // File CSS tùy chỉnh
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';






function Checkout({ cart = [], total }) {
    const status = "Đang xử lý"
    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('userEmail');
    const userPhone = localStorage.getItem('userPhone');
    const userAddress = localStorage.getItem('userAddress');
    const [formData, setFormData] = useState({
        name: userName,
        phone: userPhone,
        email: userEmail,
        address: userAddress,


        paymentMethod: 'COD',
    });
    const navigate = useNavigate(); // Hook để chuyển trang

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem('userId'); // Lấy userId từ localStorage
        if (!userId) {
            alert('Vui lòng đăng nhập để tiếp tục.');
            return;
        }
        try {
            const response = await axios.post('http://localhost:8080/api/v1/orders', {
                ...formData,
                cart,
                total,
                status,
                userId
            });
            if (response.status === 200) {
                alert('Đặt hàng thành công!');
                navigate('/ordersuser');

            }
        } catch (error) {
            console.error('Lỗi khi đặt hàng:', error);
            alert('Đặt hàng thất bại!');
        }
    };


    return (
        <div className="checkout-container">
            <h2 className="checkout-title">Thông tin thanh toán</h2>
            <div className="checkout-form">
                <form onSubmit={handleSubmit}>
                    {/* Form thông tin khách hàng */}
                    <div className="form-section">
                        <div className="form-group">
                            <label>Họ và tên</label>
                            <input
                                type="text"
                                className="form-input"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Nhập họ và tên"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Số điện thoại</label>
                            <input
                                type="text"
                                className="form-input"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Nhập số điện thoại"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                className="form-input"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Nhập email"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Địa chỉ</label>
                            <input
                                type="text"
                                className="form-input"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Nhập địa chỉ giao hàng"
                                required
                            />
                        </div>


                    </div>

                    {/* Chọn phương thức thanh toán */}
                    <div className="form-group">
                        <label>Phương thức thanh toán</label>
                        <select
                            className="form-input"
                            name="paymentMethod"
                            value={formData.paymentMethod}
                            onChange={handleChange}
                            required
                        >
                            <option value="COD">Thanh toán khi nhận hàng (COD)</option>
                            <option value="Card">Thanh toán qua thẻ</option>
                            <option value="QR">Thanh toán qua QR Code</option>
                        </select>
                    </div>

                    {/* Hiển thị giỏ hàng */}
                    <div className="cart-section">
                        <h3>Đơn hàng</h3>
                        {cart && cart.length > 0 ? (
                            <ul>
                                {cart.map((item, index) => (
                                    <li key={index}>
                                        <li key={index}>
                                            {item.title} x {item.quantity} - {(item.price * item.quantity).toLocaleString()} VND
                                        </li>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>Giỏ hàng trống</p>
                        )}
                        <p className="total-price">
                            <strong>Tổng cộng: {total.toLocaleString()} VND</strong>
                        </p>
                    </div>

                    <button type="submit" className="btn-submit">Hoàn tất đặt hàng</button>
                </form>
            </div>
        </div>
    );
}

export default Checkout;
