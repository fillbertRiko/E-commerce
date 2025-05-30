import React, { useState } from "react";
import "../../css/app.css";

const DropdownMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="dropdown-menu">
            <button onClick={() => setIsOpen(!isOpen)}>
                Tài khoản ▼
            </button>

            {isOpen && (
                <ul className="dropdown-list">
                    <li><a href="/profile">Hồ sơ</a></li>
                    <li><a href="/orders">Đơn hàng</a></li>
                    <li><a href="/logout">Đăng xuất</a></li>
                </ul>
            )}
        </div>
    );
};

export default DropdownMenu;
