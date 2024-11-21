import React from 'react';
import { useParams } from 'react-router-dom';

function ProductDetail({ products, addToCart }) {
    const { id } = useParams(); // Lấy id từ URL

    // Tìm sản phẩm trong JSON (giả sử trong JSON id là productId)
    const product = products.find(p => p.productId === parseInt(id)); // Sử dụng parseInt nếu id là số

    // Nếu không tìm thấy sản phẩm, hiển thị thông báo lỗi
    if (!product) {
        return <p>Product not found!</p>;
    }

    return (
        <div className="container">
            <h1>{product.title}</h1>
            <img src={product.poster} alt={product.title} className="img-fluid" />
            <p><strong>Description:</strong> {product.description}</p>
            <p><strong>Price:</strong> {product.price} VND</p>
            <p><strong>Release Date:</strong> {product.releaseDate}</p>
            <button className="btn btn-success" onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
    );
}

export default ProductDetail;
