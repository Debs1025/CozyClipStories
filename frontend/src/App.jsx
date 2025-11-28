// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Settings from './page/Settings.jsx';
import Navbar from "./component/layout/Navbar.jsx";
import GamifiedShop from './page/shop.jsx';
import { CoinsProvider } from './context/CoinsContext.jsx';

function App() {
    return (
        <Router>
            <CoinsProvider>
                <Navbar />
                <Routes>
                    <Route path="/settings/*" element={<Settings />} />
                    <Route path="/shop" element={<GamifiedShop />} />
                    {/* You can add more routes here */}
                </Routes>
            </CoinsProvider>
        </Router>
    );
}


export default App;
