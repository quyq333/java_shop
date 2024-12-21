import React, { useState, useEffect } from "react";
import Css from "./template/CssAdmin";
import Navbar from "./template/NavbarAdmin";
import Sidebar from "./template/SidebarAdmin";
import Footer from "./template/FooterAdmin";
import axiosConfig from "../api/axiosConfig";

function OrderManagement() {
    const [orders, setOrders] = useState([]);

    // Hàm lấy danh sách đơn hàng từ API
    const getOrders = async () => {
        try {
            const response = await axiosConfig.get("/api/v1/orders"); // API endpoint cho danh sách đơn hàng
            setOrders(response.data);
            console.log("Orders fetched: ", response.data);
        } catch (err) {
            console.error("Error fetching orders: ", err);
        }
    };

    // Hàm xóa đơn hàng
    const handleDelete = async (orderId) => {
        const isConfirmed = window.confirm("Bạn có chắc chắn muốn xóa đơn hàng này?");
        if (!isConfirmed) return;

        try {
            const response = await axiosConfig.delete(`/api/v1/orders/${orderId}`); // API endpoint xóa đơn hàng
            console.log("Order deleted: ", response.data);
            alert("Đã xóa thành công!");

            // Cập nhật danh sách đơn hàng sau khi xóa
            setOrders(orders.filter((order) => order._id.$oid !== orderId));
        } catch (err) {
            console.error("Error deleting order: ", err);
        }
    };

    useEffect(() => {
        getOrders();
    }, []);

    return (
        <div>
            <Css />
            <div className="wrapper">
                <Navbar />
                <Sidebar />
                <div className="content-wrapper">
                    <div className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1 className="m-0">Quản lý đơn hàng</h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                                        <li className="breadcrumb-item active">Dashboard</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                    <table className="table">
                        <thead>
                            <tr>

                                <th scope="col">Tên khách hàng</th>
                                <th scope="col">SĐT</th>
                                <th scope="col">Email</th>
                                <th scope="col">Địa chỉ</th>
                                <th scope="col">Trạng thái</th>
                                <th scope="col">Phương thức thanh toán</th>

                                <th scope="col">Chi tiết giỏ hàng</th>
                                <th scope="col">Tổng tiền</th>

                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr >
                                    {/* Sử dụng _id.$oid nếu có, nếu không sử dụng _id trực tiếp */}

                                    <td>{order.name}</td>
                                    <td>{order.phone}</td>
                                    <td>{order.email}</td>
                                    <td>{order.address}</td>
                                    <td style={{ backgroundColor: '', color: 'red' }}>
                                        {order.status}
                                    </td>

                                    <td>{order.paymentMethod}</td>

                                    <td>
                                        {order.cart.map((item, index) => (
                                            <div key={index}>
                                                {item.title} - {item.quantity} x {item.price} ={" "}
                                                {item.quantity * item.price}
                                            </div>
                                        ))}
                                    </td>
                                    <td>{order.total} VND</td>

                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
                <Footer />
                <aside className="control-sidebar control-sidebar-dark"></aside>
            </div>
        </div>
    );
}

export default OrderManagement;
