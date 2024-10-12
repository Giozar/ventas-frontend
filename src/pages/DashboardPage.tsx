import type React from 'react';
import Menu from '../components/Menu';
import Navbar from '../components/Navbar';
import './styles/DashboardPage.css';
import { useUserContext } from '../contexts/UserContext';


const DashboardPage: React.FC = () => {

    const {username} = useUserContext();
    return (
        <div className="dashboard-container">
            <Navbar username={username} />
            <div className="main-content">
                <h1>Bienvenido al Dashboard</h1>
                <Menu />
            </div>
        </div>
    );
};

export default DashboardPage;
