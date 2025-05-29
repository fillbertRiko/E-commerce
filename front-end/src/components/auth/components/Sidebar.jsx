import React from 'react';
import { Link, useLocation } from 'react-router-dom';
//import './Sidebar.css'; // Optional: for custom styles

const sidebarLinks = [
    { to: '/auth/login', label: 'Login' },
    { to: '/auth/register', label: 'Register' },
    { to: '/auth/forgot-password', label: 'Forgot Password' },
];

const Sidebar = () => {
    const location = useLocation();

    return (
        <aside className="auth-sidebar">
            <nav>
                <ul>
                    {sidebarLinks.map(link => (
                        <li key={link.to} className={location.pathname === link.to ? 'active' : ''}>
                            <Link to={link.to}>{link.label}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;