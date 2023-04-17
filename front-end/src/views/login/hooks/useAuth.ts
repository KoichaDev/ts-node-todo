import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const useAuth = () => {
	const sendMutationAuthLogin = (payload: { username: string; password: string }) => {
		// const authLoginFn = axios.post('http://localhost:8000/auth', {
		// 	payload,
		// });

		useMutation({
			mutationFn: (payload) => {
				return axios.post('http://localhost:8000/auth', payload);
			},
		});
	};

	return { sendMutationAuthLogin };
};

export default useAuth;
