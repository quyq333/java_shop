import React, { useState } from 'react';

function Cart({ cart, setCart }) {
    const [isCheckout, setIsCheckout] = useState(false);
    const [formData, setFormData] = useState({
        address: '',
        paymentMethod: '',
        phone: ''
    });

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

            return total + (price * product.quantity);
        }, 0);
    };

    // Xử lý khi người dùng thay đổi thông tin trong form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Xử lý khi nhấn "Thanh toán"
    const handlePayment = () => {
        alert(`Thanh toán thành công!
        \nĐịa chỉ: ${formData.address}
        \nPhương thức thanh toán: ${formData.paymentMethod}
        \nSố điện thoại liên hệ: ${formData.phone}`);
    };

    if (isCheckout) {
        return (
            <div className="container">
                <h1>Checkout</h1>
                <div>
                    <h4>Enter Your Shipping and Payment Details:</h4>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="address" className="form-label">Address</label>
                            <input
                                type="text"
                                className="form-control"
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="paymentMethod" className="form-label">Payment Method</label>
                            <input
                                type="text"
                                className="form-control"
                                id="paymentMethod"
                                name="paymentMethod"
                                value={formData.paymentMethod}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label">Phone Number</label>
                            <input
                                type="text"
                                className="form-control"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </form>
                    <p><strong>Total Price: {calculateTotal()} VND</strong></p>
                    <button className="btn btn-primary" onClick={handlePayment}>Pay Now</button>
                    <button className="btn btn-secondary" onClick={handleBackToCart}>Back to Cart</button>
                </div>
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
                                        <span className="mx-2">{product.quantity} </span> {/* Hiển thị số lượng là 1 */}
                                        <button className="btn btn-sm btn-info" onClick={() => handleIncreaseQuantity(product.id)}>+</button>
                                    </div>
                                    {/* Hiển thị giá trị tính tổng với số lượng gốc */}
                                    <span>{(parseFloat(product.price) * 100)} VND</span>
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
