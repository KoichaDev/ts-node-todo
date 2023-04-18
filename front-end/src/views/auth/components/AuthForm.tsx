import { useState, useId } from 'react';
import useAuthLoginMutation from '../hooks/useAuth';

import styles from './AuthForm.module.scss';

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

	const usernameId = useId();
	const passwordId = useId();

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
		<form
			className={`${styles['auth-form']}`}
			onSubmit={handleSubmit}>
			<label
				htmlFor={usernameId}
				className='text-lg clr-text-gray-400'>
				Username:{' '}
			</label>
			<input
				type='text'
				id={usernameId}
				value={auth.username}
				onChange={handleChangeUsername}
				placeholder='username...'
			/>

			<label
				htmlFor={passwordId}
				className='text-lg clr-text-gray-400'>
				Password
			</label>

			<input
				type='password'
				id={passwordId}
				value={auth.password}
				onChange={handleChangePassword}
				placeholder='password...'
			/>
			<button type='submit'>Enter</button>
		</form>
	);
};

export default AuthForm;
