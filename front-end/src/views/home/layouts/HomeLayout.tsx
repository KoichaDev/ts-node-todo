import { Outlet, useMatch } from 'react-router-dom';

import styles from './HomeLayout.module.scss';

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
	const isRootPath = useMatch('/')?.pathname;

	return (
		<main className={`[ ${styles['root-layout']} ]`}>
			{isRootPath && children}
			<Outlet />
		</main>
	);
};

export default HomeLayout;
