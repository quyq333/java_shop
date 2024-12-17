import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart, faSignOutAlt, faHome, faUser } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function Navbar() {
    const [searchTerm, setSearchTerm] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const userName = localStorage.getItem('userName'); // Lấy tên người dùng từ localStorage
        if (userName) {
            setUserName(userName); // Cập nhật state userName
        }
    }, []);



    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
        }
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = () => {
        // Xóa thông tin người dùng trong localStorage
        localStorage.removeItem('userId');
        navigate('/');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
            <div className="container-fluid">
                {/* Logo */}
                <Link className="navbar-brand text-primary font-weight-bold" to="/home" title="Trang chủ">
                    <FontAwesomeIcon icon={faHome} />
                </Link>

                {/* Responsive Toggler */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navbar Content */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    {/* Search Bar */}
                    <form className="d-flex mx-auto search-bar" onSubmit={handleSearch}>
                        <input
                            type="text"
                            className="form-control search-input"
                            placeholder="Tìm kiếm sản phẩm..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className="btn search-btn" type="submit">
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </form>

                    {/* Navigation Links */}
                    <ul className="navbar-nav ms-auto">

                        {/* User Dropdown */}
                        <li className="nav-item dropdown">
                            <div className="nav-link user-dropdown" onClick={toggleDropdown} title="Tài khoản">
                                <FontAwesomeIcon icon={faUser} />{' '}
                                <span className="ms-1">{userName || 'Tài khoản'}</span>
                            </div>
                            {isDropdownOpen && (
                                <div className="dropdown-menu dropdown-menu-end show">
                                    <Link className="dropdown-item" to="/cart">Giỏ hàng</Link>
                                    <Link className="dropdown-item" to="/orders">Đơn hàng</Link>
                                    <Link className="dropdown-item" to="/account">Xem thông tin tài khoản</Link>
                                    <div className="dropdown-divider"></div>
                                    <button
                                        className="dropdown-item text-danger"
                                        onClick={handleLogout}
                                    >
                                        <FontAwesomeIcon icon={faSignOutAlt} /> Đăng xuất
                                    </button>
                                </div>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
