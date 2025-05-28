import React from 'react';
import '../../component/style.scss'; // Adjust the path as necessary

const AuthFooter = ({ registerLink, forgotPasswordLink }) => {
    return (
        <div className="auth-footer">
            <p>Chưa có tài khoản? <a href={registerLink}>Đăng ký ngay</a></p>
            <p><a href={forgotPasswordLink}>Quên mật khẩu?</a></p>
        </div>
    );
};

export default AuthFooter;