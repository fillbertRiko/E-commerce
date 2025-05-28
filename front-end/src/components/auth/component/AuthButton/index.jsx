import React from 'react';
import '../../component/style.scss';

const AuthButton = ({ children, onClick, type = 'button', disabled = false, isSubmitting = false }) => {
    return (
        <button
            type={type}
            className={`auth-button ${isSubmitting ? 'submitting' : ''}`}
            onClick={onClick}
            disabled={disabled || isSubmitting}
        >
            {isSubmitting ? (
                <>
                    <span className="spinner"></span>
                    {children}
                </>
            ) : (
                children
            )}
        </button>
    );
};

export default AuthButton;