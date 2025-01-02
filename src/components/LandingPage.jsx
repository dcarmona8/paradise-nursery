import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LandingPage.css';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="landing-page">
            <div className="overlay">
                <h1 className="company-name">Paradise Nursery</h1>
                <p className="company-description">
                    At <strong>Paradise Nursery</strong>, we believe that nature should be within everyone's reach.
                    We specialize in offering a wide variety of carefully selected indoor plants to beautify your home
                    and improve your quality of life. Discover our unique plants and let your home breathe nature.
                </p>
                <button className="start-button" onClick={() => navigate('/products')}>
                    Start
                </button>
            </div>
        </div>
    );
};

export default LandingPage;
