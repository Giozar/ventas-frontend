import React, { useState } from 'react';

interface PaymentMethodProps {
    paymentMethod: string;
    setPaymentMethod: (method: string) => void;
    setCardDetails: (details: { bankName: string; cardNumber: string; expiryDate: string } | null) => void;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({ paymentMethod, setPaymentMethod, setCardDetails }) => {
    const [bankName, setBankName] = useState<string>('');
    const [cardNumber, setCardNumber] = useState<string>('');
    const [expiryDate, setExpiryDate] = useState<string>('');

    const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPaymentMethod(e.target.value);
        if (e.target.value === 'efectivo') {
            setCardDetails(null);
        }
    };

    const handleCardDetailsChange = () => {
        setCardDetails({ bankName, cardNumber, expiryDate });
    };

    return (
        <div className="payment-method">
            <h2>Método de Pago</h2>
            <label>
                <input
                    type="radio"
                    value="efectivo"
                    checked={paymentMethod === 'efectivo'}
                    onChange={handlePaymentChange}
                />
                Efectivo
            </label>
            <label>
                <input
                    type="radio"
                    value="tarjeta"
                    checked={paymentMethod === 'tarjeta'}
                    onChange={handlePaymentChange}
                />
                Tarjeta
            </label>

            {paymentMethod === 'tarjeta' && (
                <div className="card-details">
                    <h3>Detalles de la Tarjeta</h3>
                    <div>
                        <label>Nombre del Banco</label>
                        <input
                            type="text"
                            value={bankName}
                            onChange={(e) => setBankName(e.target.value)}
                            onBlur={handleCardDetailsChange}
                        />
                    </div>
                    <div>
                        <label>Número de Tarjeta</label>
                        <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            onBlur={handleCardDetailsChange}
                        />
                    </div>
                    <div>
                        <label>Fecha de Vencimiento</label>
                        <input
                            type="text"
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(e.target.value)}
                            onBlur={handleCardDetailsChange}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default PaymentMethod;
