import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Replace with your API endpoint
        fetch(`/api/products/${id}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (!product) return <div>Product not found.</div>;

    return (
        <div className="product-details">
            <h2>{product.name}</h2>
            <img
                src={product.image}
                alt={product.name}
                style={{ maxWidth: '300px', width: '100%' }}
            />
            <p>{product.description}</p>
            <p>
                <strong>Price:</strong> ${product.price}
            </p>
            <button>Add to Cart</button>
        </div>
    );
};

export default ProductDetails;