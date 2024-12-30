import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AccountPage.css';
import Navbar from '../navbar/Navbar';

function AccountPage() {
    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        address: '',
        gender: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);  // Thêm trạng thái để theo dõi việc hiển thị mật khẩu

    const navigate = useNavigate();

    useEffect(() => {
        const userName = localStorage.getItem('userName');
        const userEmail = localStorage.getItem('userEmail');
        const userPhone = localStorage.getItem('userPhone');
        const userAddress = localStorage.getItem('userAddress');
        const userGender = localStorage.getItem('userGender');
        const userPassword = localStorage.getItem('userPassword');

        if (userName) {
            setUserInfo({
                name: userName,
                email: userEmail || '',
                phoneNumber: userPhone || '',
                address: userAddress || '',
                gender: userGender || '',
                password: userPassword || ''
            });
        }
    }, []);

    const handleEdit = () => {
        navigate('/edit-account');
    };

    const togglePassword = () => {
        setShowPassword(!showPassword);  // Chuyển trạng thái mật khẩu khi người dùng nhấn
    };

    return (
        <div>
            <Navbar/>
            <div className="account-page-container">
            <h2 className="account-page-title">Thông tin tài khoản</h2>
            <div className="account-info">
                <div className="account-info-item">
                    <strong>Tên:</strong> {userInfo.name}
                </div>
                <div className="account-info-item">
                    <strong>Email:</strong> {userInfo.email}
                </div>
                <div className="account-info-item">
                    <strong>Số điện thoại:</strong> {userInfo.phoneNumber}
                </div>
                <div className="account-info-item">
                    <strong>Địa chỉ:</strong> {userInfo.address}
                </div>
                <div className="account-info-item">
                    <strong>Giới tính:</strong> {userInfo.gender}
                </div>
                <div className="account-info-item">
                    <strong>Mật khẩu:</strong> {showPassword ? userInfo.password : '********'}
                    <button className="show-password-btn" onClick={togglePassword}>
                        {showPassword ? 'Ẩn' : 'Hiện'}
                    </button>
                </div>
            </div>
            <button className="edit-button" onClick={handleEdit}>Chỉnh sửa thông tin</button>
        </div>
        </div>
    );
}

export default AccountPage;
