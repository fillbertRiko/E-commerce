import React from 'react'
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../common/Header';
const About = () => {
    return (
        <>
            <Header />
            <main className='container py-5'>

                <h1 className='text-center mb-4'>Giới thiệu về Living Healthy</h1>
                <p>
                    Living Healthy là một nền tảng chăm sóc sức khỏe trực tuyến, cung cấp các dịch vụ và sản phẩm chất lượng cao để giúp bạn duy trì lối sống lành mạnh. Chúng tôi cam kết mang đến cho bạn những thông tin, sản phẩm và dịch vụ tốt nhất để cải thiện sức khỏe và chất lượng cuộc sống của bạn.
                </p>
                <p>
                    Với đội ngũ chuyên gia giàu kinh nghiệm, chúng tôi cung cấp các bài viết, video hướng dẫn và tư vấn trực tuyến về dinh dưỡng, thể dục thể thao, tâm lý học và nhiều lĩnh vực khác liên quan đến sức khỏe. Chúng tôi cũng cung cấp các sản phẩm chăm sóc sức khỏe tự nhiên và hữu cơ để hỗ trợ bạn trong hành trình chăm sóc bản thân.
                </p>
            </main>
        </>
    )
}

export default About