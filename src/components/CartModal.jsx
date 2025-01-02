import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'; // To access the global state
import '../styles/CartModal.css'; // Styles for the modal
import { addToCart, removeFromCart } from '../features/cart/cartSlice';

const CartModal = ({ isOpen, onClose }) => {
    const cartItems = useSelector((state) => state.cart.items); // Gets the products from the cart
    const dispatch = useDispatch();

    // Calculate the total
    const totalPrice = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    if (!isOpen) return null; // Renders nothing if the modal is closed

    // Handle increment quantity
    const handleIncrement = (item) => {
        dispatch(addToCart(item));
    };

    // Handle decrement quantity
    const handleDecrement = (item) => {
        if (item.quantity > 1) {
            dispatch(removeFromCart({ id: item.id, quantity: 1 }));
        } else {
            // Optional: Remove the item entirely if quantity reaches 0
            dispatch(removeFromCart({ id: item.id, quantity: item.quantity }));
        }
    };

    return (
        <div className="cart-modal-overlay" onClick={onClose}>
            <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
                <h2>Your Cart</h2>
                {cartItems.length > 0 ? (
                    <>
                        <ul className="cart-items-list">
                            {cartItems.map((item) => (
                                <li key={item.id} className="cart-item">
                                    <span>{item.name}</span>
                                    <span>{item.quantity} x {item.price} €</span>
                                    <div className="adjust-quantity-container">
                                        <button
                                            className="adjust-button decrement"
                                            onClick={() => handleDecrement(item)}
                                        >
                                            -
                                        </button>
                                        <span className="quantity-display">{item.quantity}</span>
                                        <button
                                            className="adjust-button increment"
                                            onClick={() => handleIncrement(item)}
                                        >
                                            +
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="cart-total">
                            <strong>Total:</strong> {totalPrice.toFixed(2)} €
                        </div>
                    </>
                ) : (
                    <p>The cart is empty.</p>
                )}
                <button className="close-button" onClick={onClose}>
                    Continue shopping
                </button>
            </div>
        </div>
    );
};

export default CartModal;
