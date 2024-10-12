import { useNavigate } from "react-router-dom";
import './styles/NotFoundPage.css'

export default function NotFoundPage() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="notfound-container">
      <h1 className="notfound-title">404 - Pagina no contrada</h1>
      <p className="notfound-description">
        Oops! Esta página no existe.
      </p>
      <button type="button" className="notfound-button" onClick={handleGoHome}>
        Ir a inicio
      </button>
    </div>
  );
}
