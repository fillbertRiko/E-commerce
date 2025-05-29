import React from 'react'
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'
import { useForm } from 'react-hook-form'


const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        const res = await fetch('http://localhost:8000/api/authenticate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await res.json();

        console.log(result);
        if (result.success) {
            // Handle successful login, e.g., redirect to dashboard
            console.log("Login successful");
        } else {
            // Handle login failure, e.g., show error message
            console.error("Login failed", result.message);
        }

        return (
            <>
                <Header />
                <main>
                    <div className="container my-5 d-flex justify-content-center">
                        <div className="login-form my-5">
                            <div className="card border-0 shadow">
                                <div className="card-body p-4">
                                    <form onSubmit={handleSubmit(onSubmit)} className="w-100">
                                        <h4 className='mb-3'>Login Here</h4>
                                        <div className="mb-3">
                                            <label htmlFor="" className="form-label">Email address / User</label>
                                            <input
                                                {
                                                ...register("email", {
                                                    required: "Email or username is required",
                                                    pattern: {
                                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                                        message: "Invalid email format"
                                                    }
                                                })
                                                }
                                                type="text" className={`form-control ${errors.email ? 'is-invalid' : ''}`} id="email" placeholder="Enter your email or username" required />
                                            {
                                                errors.email && <p className="invalid-feedback">{errors.email.message}</p>
                                            }
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="" className="form-label">Password</label>
                                            <input
                                                {
                                                ...register("password", {
                                                    required: "Password is required",
                                                    minLength: {
                                                        value: 6,
                                                        message: "Password must be at least 6 characters long"
                                                    }
                                                })
                                                }
                                                type="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} id="password" placeholder="Enter your password" required />
                                            {
                                                errors.password && <p className="invalid-feedback">{errors.password.message}</p>
                                            }
                                        </div>
                                        <button type="submit" className="btn btn-primary">Login</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </>
        )
    }
}

export default Login