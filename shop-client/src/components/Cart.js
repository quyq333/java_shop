import React, { useState } from 'react';

function Cart({ cart, setCart }) {
    const [isCheckout, setIsCheckout] = useState(false);

    // Tăng số lượng sản phẩm
    const handleIncreaseQuantity = (productId) => {
        setCart(cart.map(item =>
            item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        ));
    };

    // Giảm số lượng sản phẩm
    const handleDecreaseQuantity = (productId) => {
        setCart(cart.map(item =>
            item.id === productId && item.quantity > 1
                ? { ...item, quantity: item.quantity - 1 }
                : item
        ));
    };

    // Xóa sản phẩm khỏi giỏ hàng
    const handleRemoveProduct = (productId) => {
        setCart(cart.filter(item => item.id !== productId));
    };

    // Chuyển sang trang thanh toán
    const handleCheckout = () => {
        setIsCheckout(true);
    };

    // Trở lại giỏ hàng
    const handleBackToCart = () => {
        setIsCheckout(false);
    };

    // Tính tổng giá trị giỏ hàng
    const calculateTotal = () => {
        return cart.reduce((total, product) => {
            const price = parseFloat(product.price) || 0; // Kiểm tra nếu giá không hợp lệ
            const quantity = parseInt(product.quantity, 10) || 0; // Kiểm tra nếu số lượng không hợp lệ
            return total + (price * quantity);
        }, 0);
    };

    if (isCheckout) {
        return (
            <div className="container">
                <h1>Checkout</h1>
                <p><strong>Total Price: {calculateTotal()} VND</strong></p>
                <button className="btn btn-primary" onClick={() => alert('Payment successful!')}>Pay Now</button>
                <button className="btn btn-secondary" onClick={handleBackToCart}>Back to Cart</button>
            </div>
        );
    }

    return (
        <div className="container">
            <h1>Your Cart</h1>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    <ul className="list-group">
                        {cart.map((product) => (
                            <li key={product.id} className="list-group-item d-flex justify-content-between align-items-center">
                                <img src={product.poster} alt={product.title} style={{ width: 50, marginRight: 10 }} />
                                <span>{product.title}</span>
                                <div className="d-flex align-items-center">
                                    <button className="btn btn-sm btn-danger" onClick={() => handleRemoveProduct(product.id)}>Remove</button>
                                    <div className="mx-2">
                                        <button className="btn btn-sm btn-info" onClick={() => handleDecreaseQuantity(product.id)}>-</button>
                                        <span className="mx-2">{(product.quantity / 100)} </span>
                                        <button className="btn btn-sm btn-info" onClick={() => handleIncreaseQuantity(product.id)}>+</button>
                                    </div>
                                    {/* Hiển thị giá trị tính tổng */}
                                    <span>{(parseFloat(product.price) * parseInt(product.quantity, 10)) / 100} VND</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="d-flex justify-content-between mt-3">
                        <h4>Total: {calculateTotal()} VND</h4>
                        <button className="btn btn-success" onClick={handleCheckout}>Proceed to Checkout</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cart;