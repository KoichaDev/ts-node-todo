import { useState } from 'react';
import useAuthLoginMutation from '../hooks/useAuth';

type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

type Auth = {
	username: string;
	password: string;
};

const initState: Auth = {
	username: '',
	password: '',
};

const AuthForm = () => {
	const [auth, setAuth] = useState(initState);
	const { loginAuthMutation } = useAuthLoginMutation();

	const handleChangeUsername = (e: ChangeEvent) => {
		const enteredUsername = e.target.value;
		setAuth((prevState) => {
			return { ...prevState, username: enteredUsername };
		});
	};

	const handleChangePassword = (e: ChangeEvent) => {
		const enteredPassword = e.target.value;

		setAuth((prevState) => {
			return { ...prevState, password: enteredPassword };
		});
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const payload = {
			username: auth.username,
			password: auth.password,
		};

		loginAuthMutation.mutate(payload);

		setAuth(initState);
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type='text'
				value={auth.username}
				onChange={handleChangeUsername}
				placeholder='username...'
			/>

			<input
				type='password'
				value={auth.password}
				onChange={handleChangePassword}
				placeholder='password...'
			/>
			<button type='submit'>Enter</button>
		</form>
	);
};

export default AuthForm;
