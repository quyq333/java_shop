import React from 'react';
import { Link } from 'react-router-dom';

function Home({ products, addToCart }) {

    
    return (
        <div className="container">
            <h1>Welcome to the Shop!</h1>
            <div className="row">
                {products.length === 0 ? (
                    <p>Loading products...</p>
                ) : (
                    products.map((product) => (
                        <div key={product.id} className="col-md-4 mb-4">
                            <div className="card">
                                <img src={product.poster} alt={product.title} className="card-img-top" />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{product.title}</h5>
                                    <p className="card-text">{product.description}</p>
                                    <p className="card-text"><strong>{product.price} VND</strong></p>
                                    <div className="mt-auto">
                                        <Link to={`/product/${product.id}`} className="btn btn-primary">View Details</Link>
                                        <button className="btn btn-secondary" onClick={() => addToCart(product)}>Add to Cart</button>
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
