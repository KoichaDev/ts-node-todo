import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { AxiosResponse } from 'axios';

import { authLogin, authSignUp } from '../services/authService';
import { User, AuthError } from '../types/auth.types';

const useAuthLoginMutation = () => {
	const navigate = useNavigate();

	// prettier-ignore
	const loginAuthMutation = useMutation<AxiosResponse, AuthError, User>((payload: User) => {
			return authLogin(payload);
		},
		{
			onSuccess: () => {
				localStorage.setItem('auth', JSON.stringify({isLoggedIn: true}))
				navigate('/dashboard');
			},
		}
	);

	// prettier-ignore
	const signUpAuthMutation = useMutation<AxiosResponse, AuthError, User>((payload: User) => {
		return authSignUp(payload);
	},
	{
		onSuccess: () => {
			localStorage.setItem('auth', JSON.stringify({isLoggedIn: true}))
			navigate('/dashboard');
		},
	}
);

	return { loginAuthMutation, signUpAuthMutation };
};

export default useAuthLoginMutation;
