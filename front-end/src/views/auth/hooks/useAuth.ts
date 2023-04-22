import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { AxiosResponse } from 'axios';
// import { InitialStates } from '../context/auth-provider.types';

import { authLogin, authSignUp } from '../services/authService';
import { User, AuthError } from '../types/auth.types';

const useAuthLoginMutation = () => {
	const navigate = useNavigate();

	const loginAuthMutation = useMutation<AxiosResponse, AuthError, User>({
		mutationFn: (payload: User) => authLogin(payload),
		onSuccess: () => {
			localStorage.setItem('auth', JSON.stringify({ isLoggedIn: true }));
			navigate('/dashboard');
		},
	});

	// prettier-ignore
	const signUpAuthMutation = useMutation<AxiosResponse, AuthError, User>(
	{
		mutationFn: (payload: User) => authSignUp(payload),
		onSuccess: () => {
			localStorage.setItem('auth', JSON.stringify({isLoggedIn: true}))
			navigate('/dashboard');
		},
	}
);

	return { loginAuthMutation, signUpAuthMutation };
};

export default useAuthLoginMutation;
