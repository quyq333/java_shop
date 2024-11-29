import React, { useState, useEffect } from 'react';
import Css from './template/CssAdmin';
import Navbar from './template/NavbarAdmin';
import Sidebar from './template/SidebarAdmin';
import Footer from './template/FooterAdmin';
import axiosConfig from '../api/axiosConfig';

function DashboardUsers() {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const response = await axiosConfig.get("/api/v1/users");
      setUsers(response.data);
      console.log(response.data);
    } catch (err) {
      console.log("Error fetching users: ", err);
    }
  };

  // Hàm xóa người dùng
  // Hàm xóa người dùng bằng email
  const handleDelete = async (email) => {
    const isConfirmed = window.confirm("Bạn có chắc chắn muốn xóa người dùng này?");
    if (!isConfirmed) return;

    try {
      console.log("Trying to delete user with email:", email);  // Debug log
      const response = await axiosConfig.delete(`/api/v1/users/email/${email}`);
      console.log("User deleted: ", response.data);

      // Sau khi xóa, cập nhật lại danh sách người dùng
      setUsers(users.filter(user => user.email !== email));
    } catch (err) {
      console.log("Error deleting user: ", err);
    }
  };



  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <Css />
      <div className="wrapper">
        <Navbar />
        <Sidebar />
        {/* Content Wrapper. Contains page content */}
        <div className="content-wrapper">
          {/* Content Header (Page header) */}
          <div className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1 className="m-0">Dashboard</h1>
                </div>{/* /.col */}
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item active">Dashboard</li>
                  </ol>
                </div>{/* /.col */}
              </div>{/* /.row */}
            </div>{/* /.container-fluid */}
          </div>
          {/* /.content-header */}
          {/* Main content */}
          <table className='table'>
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone number</th>
                <th scope="col">Password</th>
                <th scope="col">Gender</th>
                <th scope="col">Address</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{user.id.timestamp}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phoneNumber}</td>
                  <td>{user.password}</td>
                  <td>{user.gender}</td>
                  <td>{user.address}</td>
                  <td>
                    <a
                      style={{
                        textDecoration: "none",
                        color: "white",
                        backgroundColor: "#f44336",
                        padding: "8px 16px",
                        borderRadius: "4px",
                        transition: "background-color 0.3s"
                      }}
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleDelete(user.email); // Gọi hàm xóa theo email
                      }}
                    >
                      Delete
                    </a>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* /.content-wrapper */}
        <Footer />
        {/* Control Sidebar */}
        <aside className="control-sidebar control-sidebar-dark">
          {/* Control sidebar content goes here */}
        </aside>
        {/* /.control-sidebar */}
      </div>
    </div>
  );
}

export default DashboardUsers;
