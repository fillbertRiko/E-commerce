import React from 'react';
import LoginForm from '../component/LoginForm/index.jsx';
import '../component/style.scss'; // Adjust the path as necessary

const LoginPage = () => {
    const handleLogin = (formData) => {
        console.log('Login data:', formData);
        // Gọi API login ở đây
        // fetch('/api/login', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify(formData),
        // })
        // .then(response => response.json())
        // .then(data => {
        //   console.log('Success:', data);
        // })
        // .catch((error) => {
        //   console.error('Error:', error);
        // });
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-header">
                    <h1>Đăng nhập hệ thống</h1>
                    <p>Vui lòng nhập thông tin tài khoản của bạn</p>
                </div>
                <LoginForm onSubmit={handleLogin} />
            </div>
        </div>
    );
};

export default LoginPage;