import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; 
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

function Home({ products, addToCart }) {
    const [visibleProducts, setVisibleProducts] = useState(24); // Số sản phẩm hiển thị ban đầu
    const [selectedTypes, setSelectedTypes] = useState([]); // Lưu trữ các loại đã chọn
    const [selectedPriceRanges, setSelectedPriceRanges] = useState([]); // Lưu trữ các phạm vi giá đã chọn
    const [sortOrder, setSortOrder] = useState('default');

    // Hàm để hiển thị thêm sản phẩm
    const handleShowMore = () => {
        setVisibleProducts(visibleProducts + 12); // Tăng số sản phẩm hiển thị mỗi lần nhấn
    };

    // Hàm khi thay đổi lựa chọn category
    const handleTypeChange = (event) => {
        const { value, checked } = event.target;
        setSelectedTypes((prevSelectedTypes) => {
            if (checked) {
                return [...prevSelectedTypes, value];
            } else {
                return prevSelectedTypes.filter((type) => type !== value);
            }
        });
    };

    // Hàm khi thay đổi lựa chọn phạm vi giá
    const handlePriceRangeChange = (event) => {
        const { value, checked } = event.target;
        setSelectedPriceRanges((prevSelectedPriceRanges) => {
            if (checked) {
                return [...prevSelectedPriceRanges, value];
            } else {
                return prevSelectedPriceRanges.filter((range) => range !== value);
            }
        });
    };

    // Dùng useMemo để tránh tính toán lại nếu selectedTypes, selectedPriceRanges, products không thay đổi
    const filteredProducts = useMemo(() => {
        let filtered = [...products];

        // Lọc theo loại
        if (selectedTypes.length > 0) {
            filtered = filtered.filter((product) => selectedTypes.includes(product.type));
        }

        // Lọc theo phạm vi giá
        if (selectedPriceRanges.length > 0) {
            filtered = filtered.filter((product) => {
                const price = parseFloat(product.price);
                return selectedPriceRanges.some((range) => {
                    switch (range) {
                        case "1":
                            return price < 100000;
                        case "2":
                            return price >= 100000 && price <= 200000;
                        case "3":
                            return price > 200000 && price <= 500000;
                        case "4":
                            return price > 500000 && price <= 700000;
                        case "5":
                            return price > 700000;
                        default:
                            return true;
                    }
                });
            });
        }

        return filtered;
    }, [selectedTypes, selectedPriceRanges, products]); // Chỉ khi nào có thay đổi mới tính lại

    // Hàm sắp xếp sản phẩm
    const sortedProducts = useMemo(() => {
        let sorted = [...filteredProducts]; // Copy để không thay đổi filteredProducts gốc

        if (sortOrder === "asc") {
            sorted.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        } else if (sortOrder === "desc") {
            sorted.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        }

        return sorted;
    }, [sortOrder, filteredProducts]); // Chỉ khi có thay đổi về sortOrder hoặc filteredProducts

    return (
        <div className='wrapper'>
            <Navbar />
            <h1 className="welcome-title">Welcome to the Shop!</h1>
            <div className="row">
                <div className="col-3">
                    

                    <div className="d-flex flex-column flex-shrink-0 p-3 ">
                        <h3>Lọc theo sản phẩm</h3>

                        <hr />
                        <ul className="nav nav-pills flex-column mb-auto align-content-center">
                            {/* Các checkbox lọc loại sản phẩm */}
                            <li className="nav-item flex-self-column">
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input"
                                        type="checkbox"
                                        value="1"
                                        onChange={handleTypeChange}
                                    />
                                    <label className="form-check-label">Giày</label>
                                </div>
                            </li>
                            <li className="flex-self-column">
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input"
                                        type="checkbox"
                                        value="2"
                                        onChange={handleTypeChange}
                                    />
                                    <label className="form-check-label">Áo</label>
                                </div>
                            </li>
                            <li className="flex-self-column">
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input"
                                        type="checkbox"
                                        value="3"
                                        onChange={handleTypeChange}
                                    />
                                    <label className="form-check-label">Túi</label>
                                </div>
                            </li>
                            <li className="flex-self-column">
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input"
                                        type="checkbox"
                                        value="4"
                                        onChange={handleTypeChange}
                                    />
                                    <label className="form-check-label">Tất</label>
                                </div>
                            </li>
                            <li className="flex-self-column">
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input"
                                        type="checkbox"
                                        value="5"
                                        onChange={handleTypeChange}
                                    />
                                    <label className="form-check-label">Mũ</label>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <h3>Lọc theo mức giá</h3>
                        <hr />
                        <ul className="nav nav-pills flex-column mb-auto align-content-center">
                            {/* Các checkbox lọc phạm vi giá */}
                            <li>
                            <select
                            className="form-select w-auto" 
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                        >
                            <option value="default">Mặc định</option>
                            <option value="asc">Giá: Thấp đến Cao</option>
                            <option value="desc">Giá: Cao đến Thấp</option>
                        </select>
                            </li>
                            <li className="nav-item flex-self-column">
                                <div className="form-check form-check-inline ">
                                    <input className="form-check-input "
                                        type="checkbox"
                                        value="1"
                                        onChange={handlePriceRangeChange}
                                    />
                                    <label className="form-check-label">{"<"} 100.000 VND</label>
                                </div>
                            </li>
                            <li className="flex-self-column">
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input"
                                        type="checkbox"
                                        value="2"
                                        onChange={handlePriceRangeChange}
                                    />
                                    <label className="form-check-label">100.000-200.000 VND</label>
                                </div>
                            </li>
                            <li className="flex-self-column">
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input"
                                        type="checkbox"
                                        value="3"
                                        onChange={handlePriceRangeChange}
                                    />
                                    <label className="form-check-label">200.000-500.000 VND</label>
                                </div>
                            </li>
                            <li className="flex-self-column">
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input"
                                        type="checkbox"
                                        value="4"
                                        onChange={handlePriceRangeChange}
                                    />
                                    <label className="form-check-label">500.000-700.000 VND</label>
                                </div>
                            </li>
                            <li className="flex-self-column">
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input"
                                        type="checkbox"
                                        value="5"
                                        onChange={handlePriceRangeChange}
                                    />
                                    <label className="form-check-label ">{">"}700.000 VND</label>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="col-8">
                    <div className="row">
                        {sortedProducts.slice(0, visibleProducts).map((product) => (
                            <div key={product.id} className="col-md-4 mb-4">
                                <div className="product-card shadow-lg rounded">
                                    <img src={product.poster} alt={product.title} className="product-img" />
                                    <div className="card-body d-flex flex-column">
                                        <h5 className="card-title">{product.title}</h5>
                                        <p className="card-text">{product.description}</p>
                                        <p className="card-price">
                                            <strong>{product.price.toLocaleString()} VND</strong>
                                        </p>
                                        <div className="mt-auto">
                                            <Link to={`/product/${product.id}`} className="btn btn-outline-primary">View Details</Link>
                                            <button className="btn btn-success" onClick={() => addToCart(product)}>Add to Cart</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <FontAwesomeIcon icon={faEllipsis} />
                    {visibleProducts < sortedProducts.length && (
                        <button className="btn btn-primary" onClick={handleShowMore}>Hiển thị thêm sản phẩm</button>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Home;
