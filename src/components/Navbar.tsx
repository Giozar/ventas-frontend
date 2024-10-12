import type React from 'react';

interface NavbarProps {
    username: string;
}

const Navbar: React.FC<NavbarProps> = ({ username }) => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">Sucursal</div>
            <div className="navbar-links">
                <span>Inicio</span>
                <span>Perfil</span>
                <span>Cerrar Sesión</span>
            </div>
            <div className="navbar-user">
                <span>Hola, {username}</span>
            </div>
        </nav>
    );
};

export default Navbar;
