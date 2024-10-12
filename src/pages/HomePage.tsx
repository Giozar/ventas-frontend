import React from 'react';
import './styles/HomePage.css';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login'); // Navega a la página de inicio de sesión
    };

    const handleInventory = () => {
        navigate('/inventory'); // Navega a la página de inventario
    };

    return (
        <div className="homepage-container">
            <div className="menu">
                <h1>Bienvenido</h1>
                <button className="menu-button" onClick={handleLogin}>
                    Iniciar Sesión
                </button>
                <button className="menu-button" onClick={handleInventory}>
                    Ver Inventario
                </button>
            </div>
        </div>
    );
};

export default HomePage;
