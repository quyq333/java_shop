import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css'; // Thêm file CSS tùy chỉnh

function Cart({ cart, setCart }) {
    const navigate = useNavigate();

    const calculateTotal = () => {
        return cart.reduce((total, product) => {
            const price = parseFloat(product.price) || 0;
            return total + price * product.quantity;
        }, 0);
    };

    const handleIncreaseQuantity = (productId) => {
        setCart(cart.map(item =>
            item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        ));
    };

    const handleDecreaseQuantity = (productId) => {
        setCart(cart.map(item =>
            item.id === productId && item.quantity > 1
                ? { ...item, quantity: item.quantity - 1 }
                : item
        ));
    };

    const handleRemoveProduct = (productId) => {
        setCart(cart.filter(item => item.id !== productId));
    };

    const handleCheckout = () => {
        navigate('/checkout', { state: { cart, total: calculateTotal() } });
    };

    return (
        <div className="cart-container">
            <h1 className="cart-title">Giỏ hàng của bạn</h1>
            {cart.length === 0 ? (
                <p className="cart-empty">Giỏ hàng của bạn hiện đang trống.</p>
            ) : (
                <div>
                    <ul className="cart-list">
                        {cart.map((product) => (
                            <li key={product.id} className="cart-item">
                                <div className="cart-item-info">
                                    <img src={product.poster} alt={product.title} className="cart-item-image" />
                                    <div className="cart-item-details">
                                        <h5 className="cart-item-title">{product.title}</h5>
                                        <p className="cart-item-price">{parseFloat(product.price).toLocaleString()} VND</p>
                                    </div>
                                </div>
                                <div className="cart-item-actions">
                                    <div className="cart-item-quantity">
                                        <button
                                            className="btn btn-decrease"
                                            onClick={() => handleDecreaseQuantity(product.id)}
                                        >
                                            -
                                        </button>
                                        <span className="quantity-value">{product.quantity}</span>
                                        <button
                                            className="btn btn-increase"
                                            onClick={() => handleIncreaseQuantity(product.id)}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button
                                        className="btn btn-remove"
                                        onClick={() => handleRemoveProduct(product.id)}
                                    >
                                        Xóa
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="cart-footer">
                        <h4 className="cart-total">Tổng cộng: {calculateTotal().toLocaleString()} VND</h4>
                        <button className="btn btn-checkout" onClick={handleCheckout}>
                            Thanh toán
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cart;
