import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Thêm Link để chuyển hướng nếu cần
import './OrderUser.css'; // Sử dụng CSS đã chỉnh sửa
import Navbar from '../navbar/Navbar';

function UserOrders() {
    const [orders, setOrders] = useState([]);
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        if (userId) {
            axios.get(`http://localhost:8080/api/v1/orders/user/${userId}`)
                .then((response) => {
                    setOrders(response.data);
                })
                .catch((error) => {
                    console.error('Lỗi khi tải đơn hàng:', error);
                });
        }
    }, [userId]);

    const handleCancelOrder = (orderId) => {
        axios.put(`http://localhost:8080/api/v1/orders/cancel/${orderId}`)
            .then(response => {
                alert('Đơn hàng đã được hủy.');
                setOrders(orders.map(order =>
                    order.id === orderId ? { ...order, status: 'Hủy' } : order
                ));
            })
            .catch(error => {
                console.error('Lỗi khi hủy đơn hàng:', error);
            });
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Hủy':
                return 'background-color: #f44336; color: white;'; // Màu đỏ cho trạng thái Hủy
            case 'Đang xử lý':
                return 'background-color: #fdd835; color: white;'; // Màu vàng cho trạng thái Đang xử lý
            default:
                return 'background-color: #4CAF50; color: white;'; // Màu xanh cho trạng thái hoàn thành
        }
    };

    return (
        <div>
            <Navbar/>
            <div className="content-wrapper">
        
        <div className="content-header">
            <div className="container-fluid">
                <div className="row mb-2">
                    <div className="col-sm-6">
                        <h1 className="m-0">Đơn hàng</h1>
                    </div>
                </div>
            </div>
        </div>

        <table className="table table-striped table-hover">
            <thead>
                <tr>
                    {/* <th scope="col">ID</th> */}
                    <th scope="col">Tên người nhận</th>
                    <th scope="col">Số điện thoại</th>
                    <th scope="col">Email</th>
                    <th scope="col">Địa chỉ</th>
                    <th scope="col">Trạng thái</th>
                    <th scope="col">Tổng tiền</th>
                    <th scope="col">Phương thức thanh toán</th>
                    <th scope="col">Chi tiết giỏ hàng</th>
                    <th scope="col">Hành động</th>
                </tr>
            </thead>
            <tbody>
                {orders.map((order) => (
                    <tr key={order.id}>
                        {/* <td>{order.id}</td> */}
                        <td>{order.name}</td>
                        <td>{order.phone}</td>
                        <td>{order.email}</td>
                        <td>{order.address}</td>
                        <td style={{ backgroundColor: getStatusStyle(order.status), color: 'blue' }}>
                            {order.status}
                        </td>
                        <td>{order.total.toLocaleString()} VND</td>
                        <td>{order.paymentMethod}</td>
                        <td>
                            <ul>
                                {order.cart && order.cart.length > 0 ? (
                                    order.cart.map((item, index) => (
                                        <li key={index}>
                                            <strong>{item.title}</strong> - Số lượng: {item.quantity}, Giá: {item.price.toLocaleString()} VND
                                        </li>
                                    ))
                                ) : (
                                    <p>Giỏ hàng rỗng.</p>
                                )}
                            </ul>
                        </td>
                        <td style={{ textAlign: 'center' }}>
                            {order.status !== 'Hủy' && (
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleCancelOrder(order.id)}
                                >
                                    Hủy đơn hàng
                                </button>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
        </div>
        
    );
}

export default UserOrders;
