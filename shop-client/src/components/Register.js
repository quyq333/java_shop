import React, { useState } from 'react';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Lấy danh sách người dùng hiện tại từ localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];

        // Kiểm tra xem email đã tồn tại chưa
        if (users.some(user => user.email === email)) {
            setMessage('Email đã được đăng ký!');
            return;
        }

        // Thêm người dùng mới vào danh sách và lưu vào localStorage
        const newUser = { email, password };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        setMessage('Đăng ký thành công!');
    };

    return (
        <div className="container">
            <h1>Register</h1>
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
                <button type="submit" className="btn btn-primary">Register</button>
            </form>

            {/* Hiển thị thông báo */}
            {message && <p className="alert alert-info mt-3">{message}</p>}
        </div>
    );
}

export default Register;
