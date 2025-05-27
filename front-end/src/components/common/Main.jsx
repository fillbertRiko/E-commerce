import React from 'react'
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

const Main = () => {
    return (
        <main>
            <section className='section-1 bg-primary text-white py-5'>
                <div className='hero-content text-center'>
                    <div className="container-fluid">
                        <span className='hero-text'>Chào mừng đến với Living Healthy</span>
                        <h1>Khám Phá Sản Phẩm Chăm Sóc Sức Khỏe</h1>
                        <p>Chúng tôi cung cấp các sản phẩm chất lượng cao<br></br> để nâng cao sức khỏe và hạnh phúc của bạn.</p>
                        <button type="button-find" className='btn btn-light'>Khám Phá Ngay</button>
                        <button type="button-learn" className='btn btn-light'>Tìm Hiểu Thêm</button>
                    </div>

                </div>
            </section>


            {/* About us section */}
            <section className='about-us py-5 bg-light'>
                <div className='container'>
                    <div className="row">
                        <div className="col-md-6">
                            <img src='/src/assets/images/1358647.png' alt='About Us' className='img-fluid w-100 ' />
                        </div>
                        <div className="col-md-6">
                            <h2>Về Chúng Tôi</h2>
                            <p>Chúng tôi là một công ty chuyên cung cấp các sản phẩm chăm sóc sức khỏe chất lượng cao. Sứ mệnh của chúng tôi là nâng cao sức khỏe và hạnh phúc của cộng đồng thông qua các sản phẩm an toàn và hiệu quả.</p>
                        </div>
                    </div>

                </div>
            </section>

            {/* Services section */}
            <section className='services py-5'>
                <div className='container'>
                    <h2 className='text-center mb-4'>Dịch Vụ Của Chúng Tôi</h2>
                    <div className='row'>
                        <div className='col-md-4'>
                            <div className='service-card'>
                                <h3>Dịch Vụ 1</h3>
                                <p>Mô tả dịch vụ 1</p>
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <div className='service-card'>
                                <h3>Dịch Vụ 2</h3>
                                <p>Mô tả dịch vụ 2</p>
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <div className='service-card'>
                                <h3>Dịch Vụ 3</h3>
                                <p>Mô tả dịch vụ 3</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Products section */}
            <section className='products py-5'>
                <div className='container'>
                    <h2 className='text-center mb-4'>Sản Phẩm Của Chúng Tôi</h2>
                    <div className='row'>
                        <div className='col-md-4'>
                            <div className='product-card'>
                                <img src='https://via.placeholder.com/150' alt='Product' className='img-fluid' />
                                <h3>Sản phẩm 1</h3>
                                <p>Mô tả sản phẩm 1</p>
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <div className='product-card'>
                                <img src='https://via.placeholder.com/150' alt='Product' className='img-fluid' />
                                <h3>Sản phẩm 2</h3>
                                <p>Mô tả sản phẩm 2</p>
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <div className='product-card'>
                                <img src='https://via.placeholder.com/150' alt='Product' className='img-fluid' />
                                <h3>Sản phẩm 3</h3>
                                <p>Mô tả sản phẩm 3</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Main