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

	let renderRoute = <Outlet />;

	if (currentPathName === '/dashboard') {
		renderRoute = <>{children}</>;
	}

	return (
		<div className={`[ ${styles['dashboard-layout']} ]`}>
			<Aside />
			<Main>{renderRoute}</Main>
		</div>
	);
};

export default LayoutDashboard;
