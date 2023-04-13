import { useState } from 'react';
import axios from 'axios';

type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleChangeUsername = (e: ChangeEvent) => setUsername(e.target.value);

	const handleChangePassword = (e: ChangeEvent) => setPassword(e.target.value);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		axios.post('http://localhost:3000/users/0');
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
