import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ setIsAuthenticated }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Lấy danh sách người dùng từ localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];

        // Kiểm tra thông tin đăng nhập
        const user = users.find(user => user.email === email && user.password === password);
        if (user) {
            setIsAuthenticated(true);
            setMessage('Đăng nhập thành công!');
            setTimeout(() => {
                navigate('/');
            }, 1500);
        } else {
            setMessage('Email hoặc mật khẩu không đúng.');
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
