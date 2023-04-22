import { createContext, useState } from 'react';
import { InitialState, AuthContextProps } from './auth-provider.types';

const initState: InitialState = {
	isLoggedIn: false,
	username: '',
	password: '',
};

const AuthContext = createContext<AuthContextProps>({
	auth: initState,
	setAuth: (): void => {},
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [auth, setAuth] = useState(initState);

	const authCtx = {
		auth,
		setAuth,
	};

	return <AuthContext.Provider value={authCtx}>{children}</AuthContext.Provider>;
};

export { AuthContext as authContext };

export default AuthProvider;
