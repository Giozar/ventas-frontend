export interface UserContextProps {
    username: string;
    setUsername: (value: string) => void;
    password: string;
    setPassword: (value: string) => void;
    loggedIn: boolean;
    setLoggedIn: (value: boolean) => void;
}