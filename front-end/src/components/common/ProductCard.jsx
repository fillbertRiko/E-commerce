import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import { FaHeart, FaShoppingCart, FaEye } from 'react-icons/fa';

const ProductCard = ({ product }) => {
    return (
        <Card className="h-100 border-0 shadow-sm">
            <div className="position-relative">
                <Card.Img variant="top" src={product.image} />
                {product.sale && (
                    <Badge bg="danger" className="position-absolute top-0 end-0 m-2">
                        -{product.sale}%
                    </Badge>
                )}
                <div className="product-actions position-absolute bottom-0 start-0 end-0 bg-light p-2 d-flex justify-content-center">
                    <Button variant="light" className="mx-1 rounded-circle">
                        <FaHeart />
                    </Button>
                    <Button variant="light" className="mx-1 rounded-circle">
                        <FaShoppingCart />
                    </Button>
                    <Button variant="light" className="mx-1 rounded-circle">
                        <FaEye />
                    </Button>
                </div>
            </div>
            <Card.Body className="text-center">
                <Card.Title className="fs-6">{product.name}</Card.Title>
                <div className="d-flex justify-content-center align-items-center">
                    {product.oldPrice && (
                        <span className="text-muted text-decoration-line-through me-2">
                            {product.oldPrice.toLocaleString()}đ
                        </span>
                    )}
                    <span className="text-danger fw-bold">
                        {product.price.toLocaleString()}đ
                    </span>
                </div>
            </Card.Body>
        </Card>
    );
};

export default ProductCard;