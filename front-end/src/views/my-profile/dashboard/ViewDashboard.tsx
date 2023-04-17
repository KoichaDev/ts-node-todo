import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import ViewTodo from '../todos/ViewTodo';
import EditTodo from '../todos/CreateTodo';

const ViewDashboard = () => {
	const navigate = useNavigate();
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		const authLocalStorage = localStorage.getItem('auth');

		if (typeof authLocalStorage === 'string') {
			const { isLoggedIn } = JSON.parse(authLocalStorage) ?? { isLoggedIn: false };
			if (isMounted && !isLoggedIn) {
				return navigate('/');
			}
		} else {
			localStorage.setItem('auth', JSON.stringify({ isLoggedIn: false }));
		}

		return setIsMounted(true);
	}, [isMounted]);
	return (
		<>
			<ViewTodo />
			<EditTodo />
		</>
	);
};

export default ViewDashboard;
