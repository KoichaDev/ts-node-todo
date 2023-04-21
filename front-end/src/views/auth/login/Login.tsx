import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@mantine/core';

import { BiArrowBack } from 'react-icons/bi';
import AuthForm from '../components/AuthForm';

const Login = () => {
	const authLocalStorage = localStorage.getItem('auth');
	const { isLoggedIn } = authLocalStorage ? JSON.parse(authLocalStorage) : { isLoggedIn: false };

	const navigate = useNavigate();
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		if (isMounted && isLoggedIn) {
			return navigate('/dashboard');
		}
		return setIsMounted(true);
	}, [isLoggedIn, isMounted]);

	return (
		<>
			<h1 className='mb-2 text-4xl text-gray-400'>👨‍💻 Login</h1>

			{!isLoggedIn && <AuthForm />}
			<Button
				leftIcon={<BiArrowBack />}
				component={Link}
				to='/'
				className='mt-10'>
				Go Back
			</Button>
		</>
	);
};

export default Login;
