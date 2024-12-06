import React from "react";
import "./Footer.css";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Logo và Giới thiệu */}
                <div className="footer-section">
                    <h3 className="footer-logo">QQSTORE</h3>
                    <p>
                        QQSTORE là nơi cung cấp những sản phẩm chất lượng nhất, mang lại sự
                        hài lòng và trải nghiệm tốt nhất cho khách hàng.
                    </p>
                </div>

                {/* Liên kết nhanh */}
                <div className="footer-section">
                    <h4>Liên kết nhanh</h4>
                    <ul>
                        <li><a href="/home">Trang chủ</a></li>
                        <li><a href="/cart">Giỏ hàng</a></li>
                        <li><a href="/login">Đăng nhập</a></li>
                        <li><a href="/register">Đăng ký</a></li>
                    </ul>
                </div>

                {/* Liên hệ */}
                <div className="footer-section">
                    <h4>Liên hệ</h4>
                    <p>Địa chỉ: 123 Đường ABC, Quận XYZ, TP. Hà Nội</p>
                    <p>Điện thoại: 0123 456 789</p>
                    <p>Email: support@qqstore.com</p>
                    <div className="social-icons">
                        <a href="#"><i className="fab fa-facebook-f"></i></a>
                        <a href="#"><i className="fab fa-instagram"></i></a>
                        <a href="#"><i className="fab fa-twitter"></i></a>
                        <a href="#"><i className="fab fa-youtube"></i></a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>© 2024 QQSTORE. Tất cả các quyền được bảo lưu. | Designed by Quang & Quý</p>
            </div>
        </footer>
    );
}

export default Footer;
