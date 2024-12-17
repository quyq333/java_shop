import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'; // CSS tùy chỉnh
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart, faUserPlus, faSignOutAlt, faHome  } from '@fortawesome/free-solid-svg-icons';



function Navbar() {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
            <div className="container-fluid">
                {/* Logo */}
                <Link className="navbar-brand text-primary font-weight-bold" to="/home" title='Trang chủ'>
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
                        <li className="nav-item">
                            <Link className="nav-link" to="/register" title='Đăng kí'>
                                <FontAwesomeIcon icon={faUserPlus} />
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/cart" title='Giỏ hàng'>
                                <FontAwesomeIcon icon={faShoppingCart} />

                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/" title='Đăng xuất'>
                                <FontAwesomeIcon icon={faSignOutAlt} />
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
