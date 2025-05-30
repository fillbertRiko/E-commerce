import React from 'react'
import { Navbar, Nav, NavDropdown, Container, Row, Col } from 'react-bootstrap'
import Header from '../common/Header'
import Footer from '../common/Footer'
import Banner from '../common/Banner'
import ProductCard from '../common/ProductCard'


const Home = () => {
    const featuredProducts = [
        {
            id: 1,
            name: 'Đồ uống từ hạt chia',
            price: 250000,
            oldPrice: 300000,
            sale: 17,
            image: '/images/product1.jpg'
        },
        {
            id: 2,
            name: 'Đồ uống từ hạt lanh',
            price: 35000,
            image: '/images/product2.jpg'
        },
        // Thêm các sản phẩm khác
    ];

    return (
        <>
            <Header />

            <Banner />

            <Container className="my-5">
                <h2 className="text-center mb-4">Sản phẩm nổi bật</h2>
                <Row>
                    {featuredProducts.map(product => (
                        <Col key={product.id} md={3} className="mb-4">
                            <ProductCard product={product} />
                        </Col>
                    ))}
                </Row>
            </Container>

            <Container className="my-5 bg-light py-4">
                <Row className="align-items-center">
                    <Col md={6}>
                        <h3>Đăng ký nhận tin</h3>
                        <p>Nhận thông tin khuyến mãi và sản phẩm mới</p>
                    </Col>
                    <Col md={6}>
                        <div className="d-flex">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Nhập email của bạn"
                            />
                            <button className="btn btn-primary ms-2">Đăng ký</button>
                        </div>
                    </Col>
                </Row>
            </Container>

            <Footer />
        </>
    );
};

export default Home