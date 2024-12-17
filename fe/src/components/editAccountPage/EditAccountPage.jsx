import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './EditAccountPage.css';

function EditAccountPage() {
    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        address: '',
        gender: '',
        password: ''
    });

    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');
    console.log(userId);

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
                password: userPassword || '',
                role: "USER",  // Hoặc một giá trị hợp lệ như "ADMIN"
                cart: []  // Nếu bạn muốn gửi thông tin giỏ hàng, nếu không có thể để là mảng rỗng
            });
        }
        // Lấy thông tin người dùng từ backend khi trang được tải

    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSave = () => {
        // Lưu thông tin mới vào localStorage hoặc gửi yêu cầu tới API để cập nhật
        localStorage.setItem('userName', userInfo.name);
        localStorage.setItem('userEmail', userInfo.email);
        localStorage.setItem('userPhone', userInfo.phoneNumber);
        localStorage.setItem('userAddress', userInfo.address);
        localStorage.setItem('userGender', userInfo.gender);
        localStorage.setItem('userPassword', userInfo.password);
        // Gửi yêu cầu PUT để cập nhật thông tin người dùng
        // Gửi yêu cầu PUT để cập nhật thông tin người dùng
        // axios.put(`/api/v1/${userId}/update`, userInfo)
        //     .then((response) => {
        //         console.log("User updated successfully:", response.data);
        //         navigate('/account');  // Điều hướng về trang tài khoản sau khi cập nhật thành công
        //     })
        //     .catch((error) => {
        //         console.error("There was an error updating the user data!", error);
        //     });
        navigate('/account');
    };

    return (
        <div className="edit-account-container">
            <h2 className="edit-account-title">Chỉnh sửa thông tin</h2>
            <form className="edit-account-form">
                <div className="edit-account-form-item">
                    <label>Tên:</label>
                    <input
                        type="text"
                        name="name"
                        value={userInfo.name}
                        onChange={handleChange}
                        placeholder="Nhập tên"
                    />
                </div>
                <div className="edit-account-form-item">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={userInfo.email}
                        onChange={handleChange}
                        placeholder="Nhập email"
                    />
                </div>
                <div className="edit-account-form-item">
                    <label>Số điện thoại:</label>
                    <input
                        type="text"
                        name="phoneNumber"
                        value={userInfo.phoneNumber}
                        onChange={handleChange}
                        placeholder="Nhập số điện thoại"
                    />
                </div>
                <div className="edit-account-form-item">
                    <label>Địa chỉ:</label>
                    <input
                        type="text"
                        name="address"
                        value={userInfo.address}
                        onChange={handleChange}
                        placeholder="Nhập địa chỉ"
                    />
                </div>
                <div className="edit-account-form-item">
                    <label>Giới tính:</label>
                    <select
                        name="gender"
                        value={userInfo.gender}
                        onChange={handleChange}
                    >
                        <option value="">Chọn giới tính</option>
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                        <option value="Khác">Khác</option>
                    </select>
                </div>
                <div className="edit-account-form-item">
                    <label>Mật khẩu:</label>
                    <input
                        type="password"
                        name="password"
                        value={userInfo.password}
                        onChange={handleChange}
                        placeholder="Nhập mật khẩu"
                    />
                </div>
            </form>
            <button className="save-button" onClick={handleSave}>
                Lưu thay đổi
            </button>
        </div>
    );
}

export default EditAccountPage;
