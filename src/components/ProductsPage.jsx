import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Make sure to import `useSelector`
import { addToCart } from '../features/cart/cartSlice'; // Import the action from the cart slice
import productsData from '../data/products.json'; // Import the JSON file with the products
import '../styles/ProductsPage.css'; // Import the styles
import { FaShoppingCart } from 'react-icons/fa'; // Shopping cart icon
import { Link } from 'react-router-dom'; // Import Link for navigation
import { AiOutlineHome } from 'react-icons/ai'; // Import the Home icon from the AI library
import CartModal from './CartModal'; // Import the cart modal component

const ProductsPage = () => {
    const dispatch = useDispatch();
    const cartItemCount = useSelector((state) => state.cart.totalQuantity); // Get the total cart quantity from Redux
    const [isModalOpen, setModalOpen] = useState(false); // State for the cart modal

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [currentPlantIndex, setCurrentPlantIndex] = useState(0);

    // Handle click on a category
    const handleCategoryClick = (category) => {
        const categoryData = productsData.find((c) => c.category === category);
        setSelectedCategory(categoryData);
        setCurrentPlantIndex(0);
    };

    // Move to the previous plant in the carousel
    const handlePrevClick = () => {
        setCurrentPlantIndex((prev) =>
            prev === 0 ? selectedCategory.items.length - 1 : prev - 1
        );
    };

    // Move to the next plant in the carousel
    const handleNextClick = () => {
        setCurrentPlantIndex((prev) =>
            prev === selectedCategory.items.length - 1 ? 0 : prev + 1
        );
    };

    // Handle click on the cart
    const handleCartClick = () => {
        setModalOpen(true);
    }

    return (
        <div className="products-page">
            <header className="page-header">
                {/* Home icon */}
                <Link to="/" className="home-icon-container">
                    <AiOutlineHome className="home-icon" />
                </Link>
                {/* Category buttons */}
                <div className="categories-container">
                    {productsData.map((categoryData, index) => (
                        <button
                            key={index}
                            className="category-button"
                            onClick={() => handleCategoryClick(categoryData.category)}
                        >
                            {categoryData.category}
                        </button>
                    ))}
                </div>
                {/* Header with the cart icon */}
                <div
                    className="shopping-cart-container"
                    onClick={handleCartClick}
                >
                    <FaShoppingCart className="shopping-cart-icon" />
                    {cartItemCount > 0 && (
                        <div className="cart-badge">{cartItemCount}</div>
                    )}
                </div>
            </header>

            {/* Cart modal */}
            {isModalOpen && (
                <CartModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
            )}

            {/* Carousel for the selected category */}
            {selectedCategory && (
                <div className="selected-category">
                    <h2 className="selected-category-title">{selectedCategory.category}</h2>
                    <div className="carousel-container">
                        <button className="carousel-button prev" onClick={handlePrevClick}>
                            ◀
                        </button>
                        <div className="carousel-item">
                            <img
                                src={`../assets/${selectedCategory.items[currentPlantIndex].name
                                    .toLowerCase()
                                    .replace(/\s+/g, '-')}.jpg`}
                                alt={selectedCategory.items[currentPlantIndex].name}
                                className="plant-thumbnail"
                            />
                            <h3>{selectedCategory.items[currentPlantIndex].name}</h3>
                            <p>Price: {selectedCategory.items[currentPlantIndex].price} €</p>
                            <button
                                className="add-to-cart-button"
                                onClick={() =>
                                    dispatch(addToCart(selectedCategory.items[currentPlantIndex]))
                                }
                            >
                                Add to cart
                            </button>
                        </div>
                        <button className="carousel-button next" onClick={handleNextClick}>
                            ▶
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductsPage;
