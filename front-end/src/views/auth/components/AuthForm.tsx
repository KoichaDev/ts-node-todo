import { useId } from 'react';
import { Input, Button } from '@mantine/core';
import { AuthContextProps } from '../context/auth-provider.types';
import { User } from '../types/auth.types';

import 'react-toastify/dist/ReactToastify.css';

type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

type OnAddHandleSubmit = {
	onAddHandleSubmit: (payload: User) => void;
};

const AuthForm = ({ auth, setAuth, onAddHandleSubmit }: AuthContextProps & OnAddHandleSubmit) => {
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

		onAddHandleSubmit(payload);

		setAuth({
			username: '',
			password: '',
		});
	};

	return (
		<>
			<form
				className='flex-column'
				onSubmit={handleSubmit}>
				<label
					htmlFor={usernameId}
					className='text-lg text-gray-400'>
					Username:{' '}
				</label>
				<Input
					type='text'
					id={usernameId}
					value={auth.username}
					onChange={handleChangeUsername}
					placeholder='username...'
					// error={isError && !isInputFocused}
				/>

				<label
					htmlFor={passwordId}
					className='text-lg text-gray-400'

					// className={`text-lg ${textErrorClassName}`}
				>
					Password
				</label>

				<Input
					type='password'
					id={passwordId}
					value={auth.password}
					onChange={handleChangePassword}
					placeholder='password...'
				/>
				<Button
					type='submit'
					className='mt-10'
					color='teal'>
					Enter
				</Button>
			</form>
		</>
	);
};

export default AuthForm;
