import React from 'react'
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
    return (
        <footer className='bg-dark text-white py-4'>
            <div className='container text-center'>
                <p>&copy; 2023 Living Healthy. All rights reserved.</p>
                <p>Follow us on:
                    <a href='#' className='text-white ms-2'>Facebook</a> |
                    <a href='#' className='text-white ms-2'>Instagram</a> |
                    <a href='#' className='text-white ms-2'>Twitter</a>
                </p>
            </div>

        </footer>
    )
}

export default Footer