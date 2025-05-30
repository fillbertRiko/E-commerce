import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import '../../../assets/css/style.scss'; // Adjust the path as necessary
import { AppContext } from '../../../Context/AppContext';
import { useContext } from 'react';


export default function Register() {

    const { token, setToken } = useContext(AppContext);

    const navigate = useNavigate();

    //form data state
    const [formData, setData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });

    //state error
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState();

    //handle submit
    const handleRegister = async (e) => {
        e.preventDefault();

        setErrors({});
        setServerError(undefined);

        //validate confirm password
        if (formData.password !== formData.confirmPassword) {
            return setErrors({ confirmPassword: ['Mật khẩu xác nhận không khớp'] });
        }

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                Accept: 'application/json',
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                    password_confirmation: formData.confirmPassword,
                }),
            });

            // Check if the response is ok (status in the range 200-299)
            if (!response.ok) {
                const data = await response.json().catch(() => { });
                return setServerError(data?.message || 'Đã xảy ra lỗi. Vui lòng thử lại sau.');
            }

            //success response
            const data = await response.json();

            if (data?.errors) {
                setErrors(data.errors);
            } else {
                localStorage.setItem('token', data.token);
                //navigate('/'); // Redirect to home page after successful registration
                setToken(data.token); // Update the token in context
                console.log(data);
            }
            console.log('Registration successful:', data);

            navigate('/login', { state: { success: data?.message || 'Đăng ký thành công. Vui lòng đăng nhập.' } }); // Redirect to login page after successful registration

        } catch (error) {
            console.error('Error:', error);
            setServerError('Đã xảy ra lỗi. Vui lòng thử lại sau.');
        }
    }

    return (
        <div>
            <Header />
            <div className="register-container container mb-5">
                <h2>Đăng ký</h2>
                {token}
                {serverError && <div className="error-message">{serverError}</div>}

                <form onSubmit={handleRegister}>
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setData({ ...formData, email: e.target.value })}
                            required
                        />
                        {errors.email && <p className="error-message">{errors.email[0]}</p>}
                    </div>

                    <div className="form-group">
                        <label>Mật khẩu:</label>
                        <input
                            type="password"
                            value={formData.password}
                            onChange={(e) => setData({ ...formData, password: e.target.value })}
                            required
                        />
                        {errors.password && <p className="error-message">{errors.password[0]}</p>}
                    </div>
                    <div className="form-group">
                        <label>Xác nhận mật khẩu:</label>
                        <input
                            type="password"
                            value={formData.confirmPassword}
                            onChange={(e) => setData({ ...formData, confirmPassword: e.target.value })}
                            required
                        />
                        {errors.confirmPassword && <p className="error-message">{errors.confirmPassword[0]}</p>}
                    </div>
                    <button type="submit">Đăng ký</button>
                </form>
            </div>
            <Footer />
        </div>
    );
}
