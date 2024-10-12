import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './styles/LoginPage.css'
import { useUserContext } from '../contexts/UserContext';
import { apiUrl } from '../configs/api.config';
interface LoginData {
    username: string;
    password: string;
}

const LoginPage: React.FC = () => {
    const { username, setUsername} = useUserContext()
    const [password, setPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const navigate = useNavigate();
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

    
        const userData: LoginData = {
            username: username,
            password: password,
        };

        try {
        
            const response = await fetch(`${apiUrl}/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (response.ok) {
            
                console.log('Login exitoso:', data);
                navigate('/dashboard')
            
            } else {
            
                setErrorMessage(data.message || 'Error en la autenticación');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            setErrorMessage('Error en la conexión al servidor');
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleLogin}>
                <h2>Iniciar Sesión</h2>
                <div className="form-group">
                    <label htmlFor="username">Nombre de usuario</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <button type="submit">Iniciar Sesión</button>
            </form>
        </div>
    );
};

export default LoginPage;
