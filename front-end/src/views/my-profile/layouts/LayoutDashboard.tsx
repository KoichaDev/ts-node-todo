import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import Aside from './components/Aside';
import Main from './components/Main';
import styles from './LayoutDashboard.module.scss';

type LayoutDashboardProps = {
	children: React.ReactNode;
};

const LayoutDashboard = ({ children }: LayoutDashboardProps) => {
	const location = useLocation();
	const currentPathName = location.pathname;

	const [isMounted, setIsMounted] = useState(false);

	let renderRoute = <Outlet />;

	if (currentPathName === '/dashboard') {
		renderRoute = <>{children}</>;
	}

	// useEffect(() => {
	// 	const authLocalStorage = localStorage.getItem('auth');

	// 	if (typeof authLocalStorage === 'string') {
	// 		const { isLoggedIn } = JSON.parse(authLocalStorage) ?? { isLoggedIn: false };
	// 		if (isMounted && !isLoggedIn) {
	// 			return navigate('/');
	// 		}
	// 	} else {
	// 		localStorage.setItem('auth', JSON.stringify({ isLoggedIn: false }));
	// 	}

	// 	return setIsMounted(true);
	// }, [isMounted]);

	return (
		<div className={`[ ${styles['dashboard-layout']} ]`}>
			<Aside />
			<Main>{renderRoute}</Main>
		</div>
	);
};

export default LayoutDashboard;
