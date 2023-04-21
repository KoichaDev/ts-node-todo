import { Outlet, useMatch } from 'react-router-dom';

import styles from './RootLayout.module.scss';

const RootLayouts = ({ children }: { children: React.ReactNode }) => {
	const isRootPath = useMatch('/')?.pathname;

	return (
		<main className={`[ ${styles['root-layout']} ]`}>
			{isRootPath && children}
			<Outlet />
		</main>
	);
};

export default RootLayouts;
