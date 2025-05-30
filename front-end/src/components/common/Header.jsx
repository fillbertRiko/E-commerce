import React from 'react';
import { Container, Navbar, Nav, Form, FormControl, Button, Row, Col } from 'react-bootstrap';
import { FaSearch, FaUser, FaHeart, FaShoppingCart, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Header = () => {
    return (
        <header className="bg-light">
            {/* Top Header */}
            <div className="bg-primary text-white py-2">
                <Container>
                    <Row className="align-items-center">
                        <Col md={6}>
                            <div className="d-flex align-items-center">
                                <FaPhone className="me-2" />
                                <span className="me-3">Hotline: 0947698559</span>
                                <FaMapMarkerAlt className="me-2" />
                                <span>Store location</span>
                            </div>
                        </Col>
                        <Col md={6} className="text-end">
                            <Nav>
                                <Nav.Link href="#" className="text-white">Đăng nhập</Nav.Link>
                                <Nav.Link href="#" className="text-white">Đăng ký</Nav.Link>
                            </Nav>
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* Main Header */}
            <Navbar bg="light" expand="lg" className="py-3">
                <Container>
                    <Navbar.Brand href="/" className="fw-bold fs-3 text-primary">Living Healthy</Navbar.Brand>

                    <Form className="d-flex mx-4 flex-grow-1">
                        <FormControl
                            type="search"
                            placeholder="Tìm kiếm sản phẩm..."
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="primary">
                            <FaSearch />
                        </Button>
                    </Form>

                    <Nav className="ms-auto">
                        <Nav.Link href="#" className="mx-2">
                            <FaUser size={20} />
                        </Nav.Link>
                        <Nav.Link href="#" className="mx-2">
                            <FaHeart size={20} />
                        </Nav.Link>
                        <Nav.Link href="#" className="mx-2 position-relative">
                            <FaShoppingCart size={20} />
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                0
                            </span>
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

            {/* Category Menu */}
            <div className="bg-dark text-white py-2">
                <Container>
                    <Nav>
                        <Nav.Link href="#" className="text-white me-3">Trang chủ</Nav.Link>
                        <Nav.Link href="#" className="text-white me-3">Sản phẩm hữu cơ</Nav.Link>
                        <Nav.Link href="#" className="text-white me-3">Bao bì</Nav.Link>
                        <Nav.Link href="#" className="text-white me-3">Cách sử dụng sản phẩm</Nav.Link>
                        <Nav.Link href="#" className="text-white me-3">Về chúng tôi</Nav.Link>
                        <Nav.Link href="#" className="text-white me-3">Khuyến mãi</Nav.Link>
                        <Nav.Link href="#" className="text-white">Liên hệ</Nav.Link>
                    </Nav>
                </Container>
            </div>
        </header>
    );
};

export default Header;