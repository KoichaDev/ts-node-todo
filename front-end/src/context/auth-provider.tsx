import React, { createContext, useState } from 'react';

type AuthContextType = {
	username: string;
	setUsername: (enteredUsername: string) => void;
	isLoggedIn: Boolean;
	setIsLoggedIn: (isLoggedIn: boolean) => void;
};

const AuthContext = createContext<AuthContextType>({
	username: '',
	setUsername: () => {},
	isLoggedIn: false,
	setIsLoggedIn: () => {},
});

type AuthProviderProps = {
	children: React.ReactNode;
};
const AuthProvider = ({ children }: AuthProviderProps) => {
	const [username, setUsername] = useState('');
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const authCtx = {
		username,
		setUsername,
		isLoggedIn,
		setIsLoggedIn,
	};

	return <AuthContext.Provider value={authCtx}>{children}</AuthContext.Provider>;
};

export { AuthContext as authContext };

export default AuthProvider;
