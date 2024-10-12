import React, { useState } from 'react';
import ClientForm from '../components/ClientForm';
import PaymentMethod from '../components/PaymentMethod';
import ProductList from '../components/ProductList';
import './styles/SalePage.css';
import { useNavigate } from 'react-router-dom';
import { apiUrl } from '../configs/api.config';

interface Product {
    id: string;
    name: string;
    cost: number;
    quantity: number;
}

interface SaleData {
    branch: string;
    clientName: string;
    clientPhone: string;
    clientAddress: string;
    products: Product[];
    paymentMethod: string;
    cardDetails?: {
        bankName: string;
        cardNumber: string;
        expiryDate: string;
    };
}

const SalePage: React.FC = () => {
    const [clientName, setClientName] = useState<string>('');
    const [clientPhone, setClientPhone] = useState<string>('');
    const [clientAddress, setClientAddress] = useState<string>('');
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
    const [paymentMethod, setPaymentMethod] = useState<string>('efectivo');
    const [cardDetails, setCardDetails] = useState<{ bankName: string; cardNumber: string; expiryDate: string } | null>(null);
    const [receipt, setReceipt] = useState<SaleData | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

    const handleGenerateReceipt = async () => {
        // Verificar si hay productos seleccionados
        if (selectedProducts.length === 0) {
            setErrorMessage('Debes agregar al menos un producto para generar la nota de compra.');
            return;
        }

        const saleData: SaleData = {
            branch: 'Sucursal 1',
            clientName,
            clientPhone,
            clientAddress,
            products: selectedProducts,
            paymentMethod,
            ...(paymentMethod === 'tarjeta' && cardDetails ? { cardDetails } : {}),
        };

        // Realizar la petición POST para generar la venta
        try {
            const response = await fetch(`${apiUrl}/sales`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(saleData),
            });

            const data = await response.json();

            if (response.ok) {
                setReceipt(data); // Mostrar el recibo con los datos

                // Hacer la petición PATCH para actualizar la cantidad de productos
                await updateProductQuantities();
            } else {
                setErrorMessage('Error en la transacción.');
            }
        } catch (error) {
            setErrorMessage('Error en la solicitud: ' + error);
        }
    };

    const updateProductQuantities = async () => {
        try {
            const promises = selectedProducts.map(async (product) => {
                // Realizar petición PATCH para cada producto
                await fetch(`${apiUrl}/products/${product.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        quantity: product.quantity,
                    }),
                });
            });

            await Promise.all(promises);
            console.log('Productos actualizados exitosamente');
        } catch (error) {
            console.error('Error al actualizar la cantidad de productos:', error);
        }
    };

    return (
        <div className="sale-page-container">
            <h1>Realizar Venta</h1>
            <button type="button" className="notfound-button" onClick={handleGoHome}>
                Ir a inicio
            </button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <ClientForm
                clientName={clientName}
                setClientName={setClientName}
                clientPhone={clientPhone}
                setClientPhone={setClientPhone}
                clientAddress={clientAddress}
                setClientAddress={setClientAddress}
            />

            <ProductList selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} />

            <PaymentMethod
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
                setCardDetails={setCardDetails}
            />

            <button type='button' onClick={handleGenerateReceipt}>Generar Nota de Compra</button>

            {receipt && (
                <div className="receipt">
                    <h2>Nota de Compra</h2>
                    <p>Sucursal: {receipt.branch}</p>
                    <p>Cliente: {receipt.clientName}</p>
                    <p>Teléfono: {receipt.clientPhone}</p>
                    <p>Dirección: {receipt.clientAddress}</p>
                    <p>Método de pago: {receipt.paymentMethod}</p>
                    {receipt.paymentMethod === 'tarjeta' && receipt.cardDetails && (
                        <>
                            <p>Banco: {receipt.cardDetails.bankName}</p>
                            <p>Número de tarjeta: {receipt.cardDetails.cardNumber}</p>
                            <p>Fecha de vencimiento: {receipt.cardDetails.expiryDate}</p>
                        </>
                    )}
                    <h3>Productos</h3>
                    <ul>
                        {receipt.products.map((product, index) => (
                            <li key={product.id}>
                                {product.name} - Cantidad: {product.quantity}, Costo: ${product.cost}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SalePage;
