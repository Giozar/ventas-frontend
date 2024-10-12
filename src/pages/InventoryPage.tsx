import type React from "react";
import { useState, useEffect } from "react";
import "./styles/InventoryPage.css";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../configs/api.config";

interface Product {
  id: string;
  name: string;
  quantity: number;
  cost: number;
}

const InventoryPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Product>({
    id: generateUniqueID(),
    name: "",
    quantity: 0,
    cost: 0,
  });
  const [addedProducts, setAddedProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  // Función para obtener los productos desde la API
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}/products`); // Reemplaza con la URL de tu API
      if (!response.ok) {
        throw new Error("Error al obtener los productos");
      }
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: name === "quantity" || name === "cost" ? Number(value) : value,
    });
  };

  function generateUniqueID() {
    // Prefijo para identificar el tipo de elemento (opcional)
    const prefix = 'product_';
    // Tiempo en milisegundos desde 1970
    const timestamp = Date.now();
    // Número aleatorio de 4 dígitos
    const randomPart = Math.floor(10000 * Math.random());
    return prefix + timestamp + '_' + randomPart;
  }

  const addProductToList = () => {
    if (newProduct.name && newProduct.quantity > 0 && newProduct.cost > 0) {
      setAddedProducts([...addedProducts, newProduct]);
      setNewProduct({ id: generateUniqueID(), name: "", quantity: 0, cost: 0 }); 
    } else {
      alert("Todos los campos son obligatorios");
    }
  };

  
  const uploadProducts = async () => {
    if (addedProducts.length === 0) {
      alert("No hay productos para cargar");
      return;
    }

    try {
      await Promise.all(
        addedProducts.map( async product => {
          const response = await fetch(`${apiUrl}/products`, {
            
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product),
          });

          if (!response.ok) {
            throw new Error("Error al cargar los productos");
          }
        })
      )
      setSuccessMessage("¡Productos cargados exitosamente!");
      setAddedProducts([]); 
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    }
  };

  return (
    <div className="inventory-page-container">
      <h1>Inventario de Productos</h1>
      <button type="button" className="notfound-button" onClick={handleGoHome}>
        Ir a inicio
      </button>
      {loading ? (
        <p>Cargando productos...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="inventory-table-container">
          <table className="inventory-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Cantidad Disponible</th>
                <th>Costo ($)</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.quantity}</td>
                  <td>{product.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="add-product-container">
        <h2>Añadir Producto</h2>
        <div className="form-group">
          <input
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleChange}
            placeholder="Nombre del producto"
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Cantidad</label>
          <input
            type="number"
            name="quantity"
            value={newProduct.quantity}
            onChange={handleChange}
            placeholder="Cantidad disponible"
          />
        </div>
        <div className="form-group">
          <label htmlFor="cost">Costo</label>
          <input
            type="number"
            name="cost"
            value={newProduct.cost}
            onChange={handleChange}
            placeholder="Costo del producto"
          />
        </div>
        <button className="add-button" onClick={addProductToList}>
          Añadir a la lista
        </button>

        {addedProducts.length > 0 && (
          <>
            <h3>Productos añadidos:</h3>
            <ul>
              {addedProducts.map((product, index) => (
                <li key={product.id}>
                  {product.name} - Cantidad: {product.quantity} - Costo: $
                  {product.cost.toFixed(2)}
                </li>
              ))}
            </ul>
            <button className="upload-button" onClick={uploadProducts}>
              Cargar Productos
            </button>
          </>
        )}

        {successMessage && <p className="success-message">{successMessage}</p>}
      </div>
    </div>
  );
};

export default InventoryPage;
