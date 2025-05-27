import React from 'react'
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
    return (
        <header>
            <div className='container py-3'>
                <Navbar expand="lg">
                    <Container>
                        <Navbar.Brand href="#home" className='logo'>Living Healthy</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ms-auto">
                                <Nav.Link href="#home" className='nav-link'>Trang chủ</Nav.Link>
                                <Nav.Link href="#link" className='nav-link'>Liên hệ</Nav.Link>
                                <Nav.Link href="#link" className='nav-link'>Giới thiệu</Nav.Link>
                                <Nav.Link href="#link" className='nav-link'>Dịch vụ</Nav.Link>
                                <Nav.Link href="#link" className='nav-link'>Sản phẩm</Nav.Link>
                                <Nav.Link href="#link" className='nav-link'>Tin tức</Nav.Link>
                                <Nav.Link href="#link" className='nav-link'>Giỏ hàng</Nav.Link>
                                <NavDropdown title="Tài khoản" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="#action/3.1">Đăng nhập</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">
                                        Đăng ký
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        </header>
    )
}

export default Header