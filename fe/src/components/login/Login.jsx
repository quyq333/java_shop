import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Thư viện hỗ trợ gửi HTTP request
import './Login.css'; // CSS tuỳ chỉnh

function Login({ setIsAuthenticated, setCart, getCart }) {
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

            // Kiểm tra phản hồi từ API
            if (response.data && response.data.id) {
                const userId = String(response.data.id); // Đảm bảo ID là chuỗi
                const userName = response.data.name;

                // Lưu ID người dùng vào localStorage
                localStorage.setItem("userId", userId);

                // Hiển thị thông báo và chuyển hướng
                setMessage(response.data.message || "Đăng nhập thành công!");
                alert(`Đăng nhập thành công! Chào mừng, ${userName}`);




                setTimeout(() => {
                    navigate('/home');
                }, 1000);

                // Cập nhật trạng thái đăng nhập
                setIsAuthenticated(true);
                // Reset giỏ hàng cũ và lấy giỏ hàng mới cho người dùng mới
                setCart([]);  // Xóa giỏ hàng hiện tại
                getCart(userId);  // Lấy giỏ hàng mới


            } else {
                setMessage("Phản hồi không hợp lệ từ server!"); // Xử lý trường hợp phản hồi lỗi
            }
        } catch (error) {
            // Xử lý lỗi
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

                {/* Hiển thị thông báo lỗi hoặc thành công */}
                {message && <p className="login-message">{message}</p>}

                {/* Thêm dòng chuyển đến trang đăng ký */}
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
