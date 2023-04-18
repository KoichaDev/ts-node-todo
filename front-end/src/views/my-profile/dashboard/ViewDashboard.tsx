import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import LayoutDashboard from '../layouts/LayoutDashboard';
import ViewTodo from '../todos/ViewTodo';
import CreateTodo from '../todos/CreateTodo';
import DeleteTodo from '../todos/DeleteTodo';

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
		<LayoutDashboard>
			<ViewTodo />
			<DeleteTodo />
			<CreateTodo />
		</LayoutDashboard>
	);
};

export default ViewDashboard;
