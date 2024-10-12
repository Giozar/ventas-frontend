import { createContext, type ReactNode, useContext, useState } from 'react';
import type { UserContextProps } from '../interfaces/User.interface';

const UserContext = createContext<UserContextProps | null>(
	null,
);

export const UserProvider = ({
	children,
}: {
	children: ReactNode;
}) => {
	// Definir estados para cada propiedad del contrato
	const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

	return (
		<UserContext.Provider
			value={{
                username,
                setUsername,
                password,
                setPassword,
                loggedIn,
                setLoggedIn,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};

export const useUserContext = () => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error(
			'useUserContext debe ser usado dentro de un UserProvider',
		);
	}
	return context;
};
