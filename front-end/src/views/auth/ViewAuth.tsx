import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import AuthForm from './components/AuthForm';

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

	return <>{!isLoggedIn && <AuthForm />}</>;
};

export default ViewAuth;
