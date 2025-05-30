import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaInstagram, FaYoutube, FaTwitter, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-dark text-white py-5">
            <Container>
                <Row>
                    <Col md={3}>
                        <h5 className="mb-4">LIVING HEALTHY</h5>
                        <p>Cửa hàng chuyên cung cấp các sản phẩm chất lượng làm từ thiên nhiên</p>
                        <div className="social-icons mt-3">
                            <a href="#" className="text-white me-2"><FaFacebook size={20} /></a>
                            <a href="#" className="text-white me-2"><FaInstagram size={20} /></a>
                            <a href="#" className="text-white me-2"><FaYoutube size={20} /></a>
                            <a href="#" className="text-white"><FaTwitter size={20} /></a>
                        </div>
                    </Col>
                    <Col md={3}>
                        <h5 className="mb-4">Liên hệ</h5>
                        <p><FaMapMarkerAlt className="me-2" /> Sài Đồng, Long Biên, Hà Nội</p>
                        <p><FaPhone className="me-2" /> 0123 456 789</p>
                        <p><FaEnvelope className="me-2" /> info@livinghealthy.com</p>
                    </Col>
                    <Col md={3}>
                        <h5 className="mb-4">Danh mục</h5>
                        <ul className="list-unstyled">
                            <li><a href="#" className="text-white text-decoration-none">Đồ uống làm từ thiên nhiên</a></li>
                            <li><a href="#" className="text-white text-decoration-none">Thực phẩm chức năng</a></li>
                            <li><a href="#" className="text-white text-decoration-none">Bao bì</a></li>
                            <li><a href="#" className="text-white text-decoration-none">Chăm sóc sức khỏe</a></li>
                        </ul>
                    </Col>
                    <Col md={3}>
                        <h5 className="mb-4">Hỗ trợ</h5>
                        <ul className="list-unstyled">
                            <li><a href="#" className="text-white text-decoration-none">Hướng dẫn mua hàng</a></li>
                            <li><a href="#" className="text-white text-decoration-none">Chính sách đổi trả</a></li>
                            <li><a href="#" className="text-white text-decoration-none">Thanh toán</a></li>
                            <li><a href="#" className="text-white text-decoration-none">Câu hỏi thường gặp</a></li>
                        </ul>
                    </Col>
                </Row>
                <hr className="my-4" />
                <Row>
                    <Col className="text-center">
                        <p className="mb-0">© 2023 LIVING HEALTHY. All rights reserved.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;