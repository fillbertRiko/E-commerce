import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app"; // Giữ nguyên nếu cấu hình module hỗ trợ .jsx

// Tìm phần tử root trong DOM
const rootElement = document.getElementById("root");

if (rootElement) {
    const root = createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
} else {
    console.error("Không tìm thấy phần tử #root trong DOM");
    // Tạo phần tử root nếu không tìm thấy (tùy chọn)
    const newRoot = document.createElement('div');
    newRoot.id = 'root';
    document.body.appendChild(newRoot);

    const root = createRoot(newRoot);
    root.render(
        <React.StrictMode>
            <App />
            <div style={{ color: 'red', padding: '20px' }}>
                Lỗi: Đã tự động tạo phần tử #root vì không tìm thấy trong DOM
            </div>
        </React.StrictMode>
    );
}
