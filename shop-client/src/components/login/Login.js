import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import CSS tuỳ chỉnh

function Login({ setIsAuthenticated }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(''); // Thông báo
    const navigate = useNavigate(); // Hook để chuyển trang

    const handleSubmit = (e) => {
        e.preventDefault();

        // Logic kiểm tra đăng nhập
        if (email === 'test@example.com' && password === 'password') {
            setIsAuthenticated(true); // Đăng nhập thành công
            setMessage('Đăng nhập thành công!');
            setTimeout(() => {
                navigate('/home'); // Chuyển đến trang chính (Home)
            }, 1500); // Thời gian chờ trước khi chuyển
        } else {
            setMessage('Email hoặc mật khẩu không đúng.'); // Thông báo lỗi
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
                {message && <p className="login-message">{message}</p>}
            </div>
        </div>
    );
}

export default Login;
