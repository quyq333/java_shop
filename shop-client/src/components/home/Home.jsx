import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Thêm CSS tùy chỉnh

function Home({ products, addToCart }) {
    return (
        <div className="container">
            
            <h1 className="welcome-title">Welcome to the Shop!</h1>
            <div className="row">
                {products.length === 0 ? (
                    <p className="loading-text">Loading products...</p>
                ) : (
                    products.map((product) => (
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
                    ))
                )}
            </div>
        </div>
    );
}

export default Home;
