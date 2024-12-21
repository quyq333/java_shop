import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            email,
            password,
            name,
            phoneNumber,
            gender,
            address,
            role: 'user',

            cart: [], // Khởi tạo gi�� hàng r��ng cho người dùng mới
        };

        try {
            const response = await fetch("http://localhost:8080/api/v1/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            const data = await response.text();

            if (response.status === 200 && data === "Email already exists!") {
                // Nếu backend trả về lỗi email đã tồn tại
                setMessage("Email đã tồn tại, vui lòng chọn email khác!");
                alert('Đăng ký thất bại: Email đã tồn tại');
            } else if (response.status === 200) {
                // Đăng ký thành công
                alert('Đăng ký thành công!');
                navigate('/'); // Chuyển hướng về trang đăng nhập sau khi đăng ký thành công
            } else {
                setMessage(data); // Hiển thị thông báo từ server nếu có lỗi khác
                alert('Đăng ký thất bại. Vui lòng thử lại!');
            }
        } catch (error) {
            console.error("Error:", error);
            alert('Đăng ký thất bại. Vui lòng thử lại!');
            setMessage("Something went wrong!");
        }

    };

    return (
        <div className="register-container">
            <div className="register-box">
                <h2 className="register-title">Đăng ký</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Nhập email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Mật khẩu</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Nhập mật khẩu"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Tên người dùng</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nhập tên người dùng"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Số điện thoại</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nhập số điện thoại"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Giới tính</label>
                        <select
                            className="form-control"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            required
                        >
                            <option value="">Chọn giới tính</option>
                            <option value="male">Nam</option>
                            <option value="female">Nữ</option>
                            <option value="other">Khác</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Địa chỉ</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nhập địa chỉ"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary register-button">Đăng ký</button>
                </form>
                {message && <p className="register-message">{message}</p>}
            </div>
        </div>
    );
}

export default Register;
