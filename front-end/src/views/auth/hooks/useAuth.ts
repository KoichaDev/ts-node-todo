import { useMutation } from '@tanstack/react-query';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { authContext } from '@/context/auth-provider';

import axios, { AxiosResponse } from 'axios';

type PayloadAuthMutationType = {
	username: string;
	password: string;
};

const URLS = {
	auth: 'http://localhost:8000/login',
};

type ErrorMessage = {
	response: {
		data: {
			error: {
				message: string;
			};
		};
	};
};

const useAuthLoginMutation = () => {
	const { isLoggedIn, setIsLoggedIn } = useContext(authContext);
	const navigate = useNavigate();

	// prettier-ignore
	const loginAuthMutation = useMutation<AxiosResponse, AxiosResponse & ErrorMessage, PayloadAuthMutationType>((payload: PayloadAuthMutationType) => {
			return axios.post(URLS.auth, payload);
		},
		{
			onError: () => setIsLoggedIn(false),
			onSuccess: () => {
				setIsLoggedIn(true);
				localStorage.setItem('auth', JSON.stringify({isLoggedIn: true}))
				navigate('/dashboard');
			},
		}
	);

	return { loginAuthMutation };
};

export default useAuthLoginMutation;
