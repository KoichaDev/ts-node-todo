import { User } from '../types/auth.types';

export type IsLoggedIn = {
	isLoggedIn: boolean;
};

export type InitialState = User & Partial<IsLoggedIn>;

export type AuthContextProps = {
	auth: InitialState;
	setAuth: React.Dispatch<React.SetStateAction<InitialState>>;
};
