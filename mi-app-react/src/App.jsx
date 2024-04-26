import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import Menu from './Menu';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/menu" element={<Menu />} />
            </Routes>
        </div>
    );
}

export default App;
