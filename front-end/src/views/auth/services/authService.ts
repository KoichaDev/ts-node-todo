import axios from 'axios';
import { User, AuthSuccess } from '../types/auth.types';

const URLS = {
	authLogin: 'http://localhost:8000/login',
	authSignUp: 'http://localhost:8000/sign-up',
};

const authLogin = (payload: User) => {
	return axios.post<AuthSuccess>(URLS.authLogin, payload);
};

const authSignUp = (payload: User) => {
	return axios.post<AuthSuccess>(URLS.authSignUp, payload);
};

export { authLogin, authSignUp };
