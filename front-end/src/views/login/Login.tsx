import { useState, useContext } from 'react';
import { useMutation } from '@tanstack/react-query';

import { authContext } from '../../context/auth-provider';
import axios from 'axios';

type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const { setIsLoggedIn } = useContext(authContext);

	const handleChangeUsername = (e: ChangeEvent) => setUsername(e.target.value);

	const handleChangePassword = (e: ChangeEvent) => setPassword(e.target.value);

	const { mutate: sendMutationAuthLogin } = useMutation({
		mutationFn: (payload: { username: string; password: string }) => {
			return axios.post('http://localhost:8000/auth', payload);
		},
		onError: () => setIsLoggedIn(false),
		onSuccess: () => setIsLoggedIn(true),
	});

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const payload = {
			username,
			password,
		};

		sendMutationAuthLogin(payload);
		setUsername('');
		setPassword('');
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type='text'
				value={username}
				onChange={handleChangeUsername}
			/>

			<input
				type='password'
				value={password}
				onChange={handleChangePassword}
			/>
			<button type='submit'>Enter</button>
		</form>
	);
};

export default Login;
