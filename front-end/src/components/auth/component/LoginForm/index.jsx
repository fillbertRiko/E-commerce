import React, { useState } from 'react';
import FormInput from '../FormInput/index.jsx';
import AuthButton from '../AuthButton/index.jsx';
import AuthFooter from '../AuthFooter/index.jsx';
import '../style.scss'; // Adjust the path as necessary

const LoginForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        let isValid = true;

        if (!formData.email) {
            newErrors.email = 'Vui lòng nhập email';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email không hợp lệ';
            isValid = false;
        }

        if (!formData.password) {
            newErrors.password = 'Vui lòng nhập mật khẩu';
            isValid = false;
        } else if (formData.password.length < 6) {
            newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit(formData);
        }
    };

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <FormInput
                label="Email"
                type="email"
                id="email"
                name="email"
                placeholder="Nhập email của bạn"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
            />

            <FormInput
                label="Mật khẩu"
                type="password"
                id="password"
                name="password"
                placeholder="Nhập mật khẩu"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
            />

            <AuthButton type="submit">Đăng nhập</AuthButton>

            <AuthFooter
                registerLink="/register"
                forgotPasswordLink="/forgot-password"
            />
        </form>
    );
};

export default LoginForm;