import React, { useState } from 'react';

function Checkout({ cart = [], total }) { // Mặc định cart là một mảng rỗng nếu không có dữ liệu
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        district: '',
        paymentMethod: 'COD', // Mặc định chọn thanh toán khi nhận hàng
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic xử lý thanh toán và gửi thông tin đặt hàng
        alert('Đặt hàng thành công!');
    };

    return (
        <div className="container">
            <h2>Thông tin thanh toán</h2>
            <div className="row">
                <div className="col-md-6">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Họ và tên</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label">Số điện thoại</label>
                            <input
                                type="text"
                                className="form-control"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="address" className="form-label">Địa chỉ</label>
                            <input
                                type="text"
                                className="form-control"
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="city" className="form-label">Tỉnh/Thành Phố</label>
                            <input
                                type="text"
                                className="form-control"
                                id="city"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="district" className="form-label">Quận/Huyện</label>
                            <input
                                type="text"
                                className="form-control"
                                id="district"
                                name="district"
                                value={formData.district}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Chọn phương thức thanh toán */}
                        <div className="mb-3">
                            <label htmlFor="paymentMethod" className="form-label">Phương thức thanh toán</label>
                            <select
                                className="form-select"
                                id="paymentMethod"
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

                        {/* Hiển thị thông tin giỏ hàng */}
                        <h3>Đơn hàng</h3>
                        {cart && cart.length > 0 ? (
                            <ul>
                                {cart.map((item, index) => (
                                    <li key={index}>
                                        {item.title} x {item.quantity} - {item.price * item.quantity} VND
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>Giỏ hàng trống</p>
                        )}

                        <p><strong>Tổng cộng: {total} VND</strong></p>

                        <button type="submit" className="btn btn-primary">Hoàn tất đặt hàng</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Checkout;