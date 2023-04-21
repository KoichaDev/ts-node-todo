import { useMutation } from '@tanstack/react-query';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosResponse } from 'axios';

import { authLogin } from '../services/authService';
import { User, AuthError } from '../types/auth.types';
import { authContext } from '@/context/auth-provider';

const useAuthLoginMutation = () => {
	const { setIsLoggedIn } = useContext(authContext);
	const navigate = useNavigate();

	// prettier-ignore
	const loginAuthMutation = useMutation<AxiosResponse, AuthError, User>((payload: User) => {
			return authLogin(payload);
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
