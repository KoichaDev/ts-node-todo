import { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import { Button } from '@mantine/core';
import { toast } from 'react-toastify';

import { authContext } from '../context/auth-provider';
import useAuth from '../hooks/useAuth';
import AuthForm from '../components/AuthForm';

const Login = () => {
	const [isMounted, setIsMounted] = useState(false);
	const authCtx = useContext(authContext);
	const navigate = useNavigate();

	const { loginAuthMutation } = useAuth();

	const isError = loginAuthMutation.isError;
	const errorMessage = loginAuthMutation.error?.response.data.error.message;

	const authLocalStorage = localStorage.getItem('auth');
	const { isLoggedIn } = authLocalStorage ? JSON.parse(authLocalStorage) : { isLoggedIn: false };

	useEffect(() => {
		if (isMounted && isLoggedIn) {
			return navigate('/dashboard');
		}
		return setIsMounted(true);
	}, [isLoggedIn, isMounted]);

	useEffect(() => {
		if (errorMessage !== undefined) {
			toast(`❌ ${errorMessage}!`, {
				position: 'top-center',
				autoClose: 2500,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'colored',
			});
		}
	}, [isError, errorMessage]);

	return (
		<>
			<h1 className='mb-2 text-4xl text-gray-400'>👨‍💻 Login</h1>

			{!isLoggedIn && (
				<AuthForm
					{...authCtx}
					onAddHandleSubmit={(payload) => loginAuthMutation.mutate(payload)}
				/>
			)}
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
