import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../../css/app.css";

const products = [
    { id: 1, name: "Đồ uống làm từ hạt điều", price: "150.000đ", img: "" },
    { id: 2, name: "Đồ uống làm từ hạt Macca", price: "180.000đ", img: "" }
];

const Home = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/home")
            .then(response => setData(response.data))
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    return (
        <div>
            <Header />
            <Sidebar />
            <main className="main-content">
                <h1>{data?.title || "Đang tải..."}</h1>
                <p>{data?.message || "Vui lòng chờ..."}</p>

                {/* Sản phẩm nổi bật */}
                <section className="featured">
                    <h2>Sản phẩm nổi bật</h2>
                    <div className="banner">
                        <img src="/images/featured-product.jpg" alt="Sản phẩm nổi bật" />
                    </div>
                </section>

                {/* Danh sách sản phẩm */}
                <section className="product-list">
                    <h2>Sản phẩm dành cho người tiểu đường</h2>
                    <div className="product-grid">
                        {products.map((product) => (
                            <div className="product-item" key={product.id}>
                                <img src={product.img} alt={product.name} />
                                <h3>{product.name}</h3>
                                <p>Giá: {product.price}</p>
                                <button>Mua ngay</button>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Home;
