import { useMutation } from '@tanstack/react-query';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { authContext } from '@/context/auth-provider';
import axios from 'axios';

type PayloadAuthMutationType = {
	username: string;
	password: string;
};

const URLS = {
	auth: 'http://localhost:8000/auth',
};

const useAuthLoginMutation = () => {
	const { setIsLoggedIn } = useContext(authContext);
	const navigate = useNavigate();

	// prettier-ignore
	const loginAuthMutation = useMutation((payload: PayloadAuthMutationType) => {
			return axios.post(URLS.auth, payload);
		},
		{
			onError: () => setIsLoggedIn(false),
			onSuccess: () => {
				setIsLoggedIn(true);
				navigate('/dashboard');
			},
		}
	);

	return { loginAuthMutation };
};

export default useAuthLoginMutation;
