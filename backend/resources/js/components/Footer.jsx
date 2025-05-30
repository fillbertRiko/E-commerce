import React from "react";
import "../../css/app.css";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-logo">
                <img src="/images/logo.png" alt="LIVING HEALTHY" />
            </div>

            <nav className="footer-navigation">
                <ul>
                    <li><a href="/about">Giới thiệu</a></li>
                    <li><a href="/contact">Liên hệ</a></li>
                    <li><a href="/services">Dịch vụ</a></li>
                    <li><a href="/policy">Chính sách</a></li>
                </ul>
            </nav>

            <div className="footer-hotline">
                <p>Hotline: <strong>099999998</strong></p>
            </div>
        </footer>
    );
};

export default Footer;
