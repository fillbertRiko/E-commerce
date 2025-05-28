import React from 'react';
import '../../component/style.scss'; // Adjust the path as necessary
import { Form } from 'react-hook-form';

const FormInput = React.forwardRef(({ label, type, id, name, placeholder, value, onChange, error }, ref) => {
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
                ref={ref}
                className={error ? 'input-error' : ''}
            />
            {error && <div className="error-message">{error.message}</div>}
        </div>
    );
});

FormInput.displayName = 'FormInput'; // Set display name for better debugging

export default FormInput;