import React from 'react';
import { useNavigate } from "react-router-dom";
const Menu: React.FC = () => {
    const navigate = useNavigate();
    const handleSaleClick = () => {
        alert('Redirigiendo a Realizar Venta...');
        navigate('/sale')
    };

    return (
        <div className="menu-container">
            <div className="menu-item" onClick={handleSaleClick}>
                Realizar Venta
            </div>
        </div>
    );
};

export default Menu;
