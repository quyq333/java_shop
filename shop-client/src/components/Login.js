import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Sử dụng react-router-dom để chuyển trang

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
        <div className="container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>

            {/* Hiển thị thông báo */}
            {message && <p className="alert alert-info mt-3">{message}</p>}
        </div>
    );
}

export default Login;
