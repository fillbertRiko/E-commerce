import React from "react";
import Menu from "./Menu";
import "../../css/app.css";

const Header = () => {
    return (
        <header className="header">
            {/* Logo */}
            <div className="logo">
                <img src="/images/logo.png" alt="LIVING HEALTHY" />
            </div>

            {/* Thanh tìm kiếm */}
            <div className="search-bar">
                <input type="text" placeholder="Tìm theo tên sản phẩm..." />
                <button>Tìm kiếm</button>
            </div>

            {/* Menu tài khoản */}
            <div className="account-menu">
                <button>Đăng nhập</button>
                <button>Giỏ hàng</button>
                <button>Hệ thống cửa hàng</button>
            </div>

            <Menu />
        </header>
    );
};

export default Header;
