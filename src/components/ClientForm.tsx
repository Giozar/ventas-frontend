import React from 'react';

interface ClientFormProps {
    clientName: string;
    setClientName: (name: string) => void;
    clientPhone: string;
    setClientPhone: (phone: string) => void;
    clientAddress: string;
    setClientAddress: (address: string) => void;
}

const ClientForm: React.FC<ClientFormProps> = ({
    clientName,
    setClientName,
    clientPhone,
    setClientPhone,
    clientAddress,
    setClientAddress,
}) => {
    return (
        <div className="client-form">
            <h2>Datos del Cliente</h2>
            <div>
                <label>Nombre</label>
                <input type="text" value={clientName} onChange={(e) => setClientName(e.target.value)} />
            </div>
            <div>
                <label>Teléfono</label>
                <input type="text" value={clientPhone} onChange={(e) => setClientPhone(e.target.value)} />
            </div>
            <div>
                <label>Dirección</label>
                <input type="text" value={clientAddress} onChange={(e) => setClientAddress(e.target.value)} />
            </div>
        </div>
    );
};

export default ClientForm;
