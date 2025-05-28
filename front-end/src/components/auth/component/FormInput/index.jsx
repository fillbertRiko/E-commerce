import React from 'react';
import '../../component/style.scss'; // Adjust the path as necessary

const FormInput = ({ label, type, id, name, placeholder, value, onChange, error }) => {
    return (
        <div className="form-group">
            <label htmlFor={id}>{label}</label>
            <input
                type={type}
                id={id}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={error ? 'input-error' : ''}
            />
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default FormInput;