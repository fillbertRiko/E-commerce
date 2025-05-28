import React from 'react';
import { useForm } from 'react-hook-form';
import FormInput from '../FormInput';
import AuthButton from '../AuthButton';
import AuthFooter from '../AuthFooter';
import '../style.scss'; // Adjust the path as necessary
import Header from '../../../common/Header';
import Footer from '../../../common/Footer';

const LoginForm = ({ onSubmit }) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({
        defaultValues: {
            username: '',
            password: ''
        }
    });

    const onFormSubmit = (data) => {
        onSubmit(data);
    };

    return (
        <>
            <form className="login-form" onSubmit={handleSubmit(onFormSubmit)}>
                <FormInput
                    label="Email"
                    type="email"
                    id="email"
                    placeholder="Nhập email của bạn"
                    error={errors.email}
                    {...register('email', {
                        required: 'Vui lòng nhập email',
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: 'Email không hợp lệ'
                        }
                    })}
                />

                <FormInput
                    label="Mật khẩu"
                    type="password"
                    id="password"
                    placeholder="Nhập mật khẩu"
                    error={errors.password}
                    {...register('password', {
                        required: 'Vui lòng nhập mật khẩu',
                        minLength: {
                            value: 6,
                            message: 'Mật khẩu phải có ít nhất 6 ký tự'
                        }
                    })}
                />

                <AuthButton type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Đang xử lý...' : 'Đăng nhập'}
                </AuthButton>

                <AuthFooter
                    registerLink="/register"
                    forgotPasswordLink="/forgot-password"
                />
            </form>
        </>
    );
};


export default LoginForm;