import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Sử dụng useNavigate thay vì useHistory
import './Register.css'; // Thêm file CSS tùy chỉnh cho Register

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/api/v1/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.text();
            setMessage(data); // Hiển thị kết quả từ server

            // Đăng ký thành công
            alert('Đăng ký thành công!');
            setTimeout(() => {
                navigate('/'); // Chuyển hướng về trang đăng nhập
            }, 1500);
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
                    <button type="submit" className="btn btn-primary register-button">Đăng ký</button>
                </form>
                {message && <p className="register-message">{message}</p>}
            </div>
        </div>
    );
}

export default Register;
