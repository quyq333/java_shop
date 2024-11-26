// Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Sử dụng useNavigate thay vì useHistory
import { ToastContainer, toast } from 'react-toastify'; // Để hiển thị thông báo
import 'react-toastify/dist/ReactToastify.css';


function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState("");
    const navigate = useNavigate(); 

    const handleSubmit =async (e) => {
        e.preventDefault();
        // Logic đăng ký
        try {
            const response = await fetch("http://localhost:8080/api/v1/register", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email, password }),
            });
            alert('Đăng ký thành công!');

            // Chuyển hướng về trang đăng nhập sau 2 giây
            setTimeout(() => {
                navigate('/'); // Chuyển hướng tới trang đăng nhập
            }, 0);
            const data = await response.text();
            setMessage(data); // Hiển thị kết quả từ server
          } catch (error) {
            console.error("Error:", error);
            alert('Đăng ký thất bại. Vui lòng thử lại!');
            setMessage("Something went wrong!");
          }
        

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
        </div>
    );
}

export default Register;
