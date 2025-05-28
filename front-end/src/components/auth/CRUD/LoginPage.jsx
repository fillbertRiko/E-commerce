import React from 'react';
import LoginForm from '../component/LoginForm/index.jsx';
import '../component/style.scss'; // Adjust the path as necessary
import Header from '../../common/Header.jsx'; // Adjust the path as necessary
import Footer from '../../common/Footer.jsx'; // Adjust the path as necessary
import { toast } from 'react-toastify';


const LoginPage = () => {
    const handleLogin = async (formData) => {
        try {
            // Gọi API login
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.message || 'Đăng nhập thất bại');
            }

            console.log('Đăng nhập thành công:', data);
            // Xử lý sau khi đăng nhập thành công
        } catch (error) {
            console.error('Lỗi đăng nhập:', error);
            // Hiển thị thông báo lỗi cho người dùng
        }
    };

    return (
        <>
            <Header />
            <div className="login-page">
                <div className="container">
                    <h2 className="text-center mb-4">Đăng nhập</h2>
                    <LoginForm onSubmit={handleLogin} />
                </div>

            </div>
            <Footer />
        </>
    );
};

export default LoginPage;