import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

function Login({ setIsAuthenticated, setCart, getCart }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8080/api/v1/login", {
                email: email,
                password: password,
            });
            console.log("Response from server:", response.data);

            if (response.data && response.data.id) {
                const userId = String(response.data.id);
                const userRole = String(response.data.role); // Giả sử server trả về role của người dùng
                const userName = response.data.name;

                // Lưu ID và role vào localStorage
                localStorage.setItem("userId", userId);
                localStorage.setItem("userRole", userRole); // Lưu role vào localStorage

                // Lưu thông tin tài khoản vào localStorage khi đăng nhập thành công
                localStorage.setItem("userName", response.data.name);
                localStorage.setItem("userEmail", response.data.email);
                localStorage.setItem("userPhone", response.data.phoneNumber);
                localStorage.setItem("userAddress", response.data.address);
                localStorage.setItem("userGender", response.data.gender);
                localStorage.setItem("userPassword", response.data.password); // Chú ý mật khẩu chỉ nên lưu tạm thời và mã hóa nếu cần


                console.log("User ID stored in localStorage:", localStorage.getItem("userId"));
                console.log("User Role stored in localStorage:", localStorage.getItem("userRole"))


                setIsAuthenticated(true); // Đảm bảo isAuthenticated được cập nhật

                setMessage(response.data.message || "Đăng nhập thành công!");
                alert(`Đăng nhập thành công! Chào mừng, ${userName}`);

                setTimeout(() => {
                    navigate('/home');
                    setIsAuthenticated(true);
                }, 1000);
                // Reset giỏ hàng cũ và lấy giỏ hàng mới cho người dùng mới
                setCart([]);  // Xóa giỏ hàng hiện tại
                getCart(userId);  // Lấy giỏ hàng mới
            } else {
                setMessage("Phản hồi không hợp lệ từ server!");
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setMessage(error.response.data.message || "Đăng nhập thất bại! Vui lòng kiểm tra thông tin.");
            } else {
                setMessage("Lỗi kết nối! Vui lòng thử lại.");
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

                {message && <p className="login-message">{message}</p>}

                <p className="register-link">
                    Chưa có tài khoản?{' '}
                    <span
                        onClick={() => navigate('/register')}
                        style={{ color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}
                    >
                        Đăng ký
                    </span>
                </p>
            </div>
        </div>
    );
}

export default Login;
