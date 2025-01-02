import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import ProductsPage from './components/ProductsPage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/products" element={<ProductsPage />} />
            </Routes>
        </Router>
    );
};

export default App;
