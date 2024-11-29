import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Thư viện hỗ trợ gửi HTTP request
import './Login.css'; // CSS tuỳ chỉnh

function Login({ setIsAuthenticated }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(''); // Thông báo
    const navigate = useNavigate(); // Hook để chuyển trang

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Gửi yêu cầu đăng nhập đến API
            const response = await axios.post("http://localhost:8080/api/v1/login", {
                email: email,
                password: password,
            });

            // Nếu đăng nhập thành công
            setMessage(response.data); // Hiển thị thông báo từ backend
            alert('Đăng nhập thành công!');
            setIsAuthenticated(true); // Đặt trạng thái đã xác thực (nếu cần)

            setTimeout(() => {
                navigate('/home'); // Chuyển đến trang chính (Home)
            }, 1500); // Thời gian chờ trước khi chuyển
        } catch (error) {
            // Xử lý lỗi
            if (error.response) {
                setMessage(error.response.data); // Hiển thị thông báo lỗi từ backend
            } else {
                setMessage("Something went wrong!"); // Lỗi khác (ví dụ: không kết nối được API)
            }
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2 className="login-title">Đăng nhập</h2>
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
                    <button type="submit" className="btn btn-primary login-button">Đăng nhập</button>
                </form>

                {/* Hiển thị thông báo lỗi hoặc thành công */}
                {message && <p className="login-message">{message}</p>}
            </div>
        </div>
    );
}

export default Login;
