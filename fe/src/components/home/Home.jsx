import {React, useState} from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Thêm CSS tùy chỉnh
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEllipsis } from '@fortawesome/free-solid-svg-icons';


function Home({ products, addToCart }) {
    const [visibleProducts, setVisibleProducts] = useState(12); // Số sản phẩm hiển thị ban đầu

    // Hàm để hiển thị thêm sản phẩm
    const handleShowMore = () => {
        setVisibleProducts(visibleProducts + 6); // Tăng số sản phẩm hiển thị mỗi lần nhấn
    };
    return (
        <div className='wrapper'>
            <Navbar/>
          
            <div className="container">
            
            <h1 className="welcome-title">Welcome to the Shop!</h1>
            <div className="row">
                {products.slice(0, visibleProducts).map((product) => (
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
            {visibleProducts < products.length && (
                <button className="btn btn-primary" onClick={handleShowMore}>Hiển thị thêm sản phẩm</button>
            )}
            </div>
        <Footer/>
        </div>
    );
}

export default Home;
