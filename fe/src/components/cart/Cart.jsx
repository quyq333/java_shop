import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css'; // Thêm file CSS tùy chỉnh
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';

function Cart() {
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    // Tính tổng tiền của giỏ hàng
    const calculateTotal = () => {
        return cart.reduce((total, product) => {
            const price = parseFloat(product.price) || 0;
            return total + price * product.quantity;
        }, 0);
    };

    // Đọc giỏ hàng từ localStorage khi trang được tải lại
    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart')) || []; // Đọc giỏ hàng từ localStorage nếu có
        setCart(savedCart);
    }, []);

    // Cập nhật giỏ hàng vào localStorage mỗi khi cart thay đổi
    useEffect(() => {
        if (cart.length > 0) {
            localStorage.setItem('cart', JSON.stringify(cart)); // Lưu giỏ hàng vào localStorage
        }
    }, [cart]);

    // Tăng số lượng sản phẩm trong giỏ hàng
    const handleIncreaseQuantity = (productId) => {
        setCart((prevCart) =>
            prevCart.map(item =>
                item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    // Giảm số lượng sản phẩm trong giỏ hàng
    const handleDecreaseQuantity = (productId) => {
        setCart((prevCart) =>
            prevCart.map(item =>
                item.id === productId && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };

    // Xóa sản phẩm khỏi giỏ hàng
    const handleRemoveProduct = (productId) => {
        setCart((prevCart) => prevCart.filter(item => item.id !== productId));
    };

    // Điều hướng đến trang thanh toán
    const handleCheckout = () => {
        navigate('/checkout', { state: { cart, total: calculateTotal() } });
    };

    return (
        <div className='wrapper'>
            <Navbar />
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
            <Footer />
        </div>
    );
}

export default Cart;
