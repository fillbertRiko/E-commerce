import React from 'react';

const Cart = ({ cartItems, onRemove, onQuantityChange }) => {
    const getTotalPrice = () =>
        cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    if (!cartItems || cartItems.length === 0) {
        return <div>Your cart is empty.</div>;
    }

    return (
        <div className="cart-container">
            <h2>Your Shopping Cart</h2>
            <ul className="cart-list">
                {cartItems.map((item) => (
                    <li key={item.id} className="cart-item">
                        <img src={item.image} alt={item.name} width={60} />
                        <div className="cart-details">
                            <span>{item.name}</span>
                            <span>${item.price.toFixed(2)}</span>
                            <input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) =>
                                    onQuantityChange(item.id, parseInt(e.target.value, 10))
                                }
                            />
                            <button onClick={() => onRemove(item.id)}>Remove</button>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="cart-total">
                <strong>Total: ${getTotalPrice().toFixed(2)}</strong>
            </div>
            <button className="checkout-btn">Proceed to Checkout</button>
        </div>
    );
};

export default Cart;