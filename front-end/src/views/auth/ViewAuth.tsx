import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import AuthForm from './components/AuthForm';

import styles from './ViewAuth.module.scss';

const ViewAuth = () => {
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
		<main className={`[ ${styles['view-auth']} ]`}>
			<h1 className='mb-2 text-4xl text-gray-400'>👨‍💻 Login</h1>

			{!isLoggedIn && <AuthForm />}
		</main>
	);
};

export default ViewAuth;
