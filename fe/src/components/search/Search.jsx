import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './Search.css'; // Sử dụng CSS từ Home

function SearchResults({ products, addToCart }) {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query') || '';

    // Lọc sản phẩm theo tiêu chí tìm kiếm
    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="container mt-4">
            <h2>Kết quả tìm kiếm cho: "{query}"</h2>
            {filteredProducts.length === 0 ? (
                <p>Không tìm thấy sản phẩm nào.</p>
            ) : (
                <div className="row">
                    {filteredProducts.map((product) => (
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
                                        <Link to={`/product/${product.id}`} className="btn btn-outline-primary">
                                            View Details
                                        </Link>
                                        <button className="btn btn-success" onClick={() => addToCart(product)}>
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SearchResults;
