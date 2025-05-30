import React from 'react';
import { Carousel } from 'react-bootstrap';

const Banner = () => {
    return (
        <Carousel>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="/images/banner1.jpg"
                    alt="First slide"
                />
                <Carousel.Caption>
                    <h3>Thức uống chất lượng dành cho người tiểu đường</h3>
                    <p>Giảm giá 30% cho đơn hàng đầu tiên</p>
                    <button className="btn btn-primary">Mua ngay</button>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="/images/banner2.jpg"
                    alt="Second slide"
                />
                <Carousel.Caption>
                    <h3>Sản phẩm hương vị đa dạng</h3>
                    <p>Miễn phí vận chuyển cho đơn từ 500k</p>
                    <button className="btn btn-primary">Xem ngay</button>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
};

export default Banner;