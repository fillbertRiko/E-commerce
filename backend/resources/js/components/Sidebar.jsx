import React, { useState } from "react";
import "../../css/app.css";

const Sidebar = () => {
    const [showLogin, setShowLogin] = useState(false);

    return (
        <aside className="sidebar">


            {/* Menu điều hướng */}
            <nav className="navigation">
                <ul>
                    <li><a href="/categories">Danh mục sản phẩm</a></li>
                    <li><a href="/cats">Mèo</a></li>
                    <li><a href="/sale">Today's Sale</a></li>
                    <li><a href="/services">Dịch vụ chăm Pets</a></li>
                    <li><a href="/magazine">Tạp chí chăm Boss</a></li>
                </ul>
            </nav>


            {/* Hotline */}
            <div className="hotline">
                <p>Hotline: <strong>099999998</strong></p>
            </div>

            {/* Nếu người dùng nhấn "Đăng nhập", hiển thị form */}
            {showLogin && (
                <div className="login-form">
                    <h2>Đăng nhập</h2>
                    <form>
                        <input type="email" placeholder="Email" required />
                        <input type="password" placeholder="Mật khẩu" required />
                        <button type="submit">Đăng nhập</button>
                    </form>
                </div>
            )}
        </aside>
    );
};

export default Sidebar;
