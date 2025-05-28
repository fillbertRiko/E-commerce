import React from 'react';
import '../../component/style.scss';

const AuthButton = ({ children, onClick, type = 'button', disabled = false }) => {
    return (
        <button
            type={type}
            className="auth-button"
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default AuthButton;