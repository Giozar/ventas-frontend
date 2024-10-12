import type React from 'react';
import { useState, useEffect } from 'react';
import { apiUrl } from '../configs/api.config';

interface Product {
    id: string;
    name: string;
    cost: number;
    quantity: number;
}

interface ProductListProps {
    selectedProducts: Product[];
    setSelectedProducts: (products: Product[]) => void;
}

const ProductList: React.FC<ProductListProps> = ({ selectedProducts, setSelectedProducts }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState<string | null>(null);

    // Fetch para obtener los productos desde la API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${apiUrl}/products`); // Cambia la URL por tu API
                if (!response.ok) {
                    throw new Error('Error al obtener los productos');
                }
                const data: Product[] = await response.json();
                setProducts(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Error desconocido');
            }
        };

        fetchProducts();
    }, []);

    // Función para agregar un producto a la lista seleccionada
    const handleAddProduct = (productId: string) => {
        const productIndex = products.findIndex((product) => product.id === productId);

        if (productIndex !== -1 && products[productIndex].quantity > 0) {
            const selectedProduct = products[productIndex];

            // Agregar el producto a la lista de seleccionados
            const updatedSelectedProducts = [...selectedProducts];
            const existingProductIndex = updatedSelectedProducts.findIndex((p) => p.id === selectedProduct.id);

            if (existingProductIndex !== -1) {
                // Si el producto ya está en la lista seleccionada, solo aumentamos su cantidad
                updatedSelectedProducts[existingProductIndex].quantity += 1;
            } else {
                // Si no está, lo agregamos con cantidad 1
                updatedSelectedProducts.push({ ...selectedProduct, quantity: 1 });
            }

            // Actualizar la lista de productos seleccionados
            setSelectedProducts(updatedSelectedProducts);

            // Reducir la cantidad del producto en la lista original (no puede bajar de 0)
            const updatedProducts = [...products];
            updatedProducts[productIndex].quantity = Math.max(0, updatedProducts[productIndex].quantity - 1);
            setProducts(updatedProducts);
        }
    };

    return (
        <div className="product-list">
            <h2>Productos</h2>
            {error ? (
                <p className="error-message">{error}</p>
            ) : (
                <ul>
                    {products.map((product) => (
                        <li key={product.id}>
                            {product.name} - Costo: ${product.cost} - Cantidad: {product.quantity}
                            <button
                            type='button'
                                onClick={() => handleAddProduct(product.id)}
                                disabled={product.quantity === 0}
                                style={{ marginLeft: '10px' }}
                            >
                                {product.quantity > 0 ? 'Agregar' : 'Agotado'}
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            <h3>Productos Seleccionados</h3>
            <ul>
                {selectedProducts.map((product) => (
                    <li key={product.id}>
                        {product.name} - Cantidad: {product.quantity} - Costo: ${product.cost}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
