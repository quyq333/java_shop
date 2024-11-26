import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Sử dụng react-router-dom để chuyển trang
import axios from 'axios';
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate(); 
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      // Thực hiện gửi thông tin đăng nhập lên backend
      try {
        const response = await axios.post("http://localhost:8080/api/v1/login", {
          email: email,
          password: password,
        });
        
        // Nếu đăng nhập thành công
        setMessage(response.data);  // Thông báo từ backend
        alert('Đăng nhập thành công!');

            // Chuyển hướng về trang đăng nhập sau 2 giây
            setTimeout(() => {
                navigate('/home'); // Chuyển hướng tới trang đăng nhập
            }, 0);
      } catch (error) {
        // Nếu có lỗi
        if (error.response) {
          setMessage(error.response.data);  // Lỗi từ backend (ví dụ: thông tin sai)
        } else {
          setMessage("Something went wrong!");  // Lỗi khác
        }
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
