import { useEffect } from 'react';
import { Link, useMatch, useNavigate } from 'react-router-dom';
import ROUTES from '@/views/dashboard/dashboardRoutes';
import _ from 'lodash';
import styles from './Aside.module.scss';

type ReactRouterDOM = {
	path: string;
	text?: string;
	children?: ReactRouterDOM[];
};

function getReactRouterPathDOM(routes: ReactRouterDOM[]): { link: string; text: string }[] {
	const parentPath = {
		link: '/',
		text: 'dashboard',
	};

	const childrenRoutes = routes.flatMap((route) => {
		return (
			route.children?.map(({ path }) => {
				return {
					link: path,
					text: path,
				};
			}) ?? []
		);
	});

	return [parentPath, ...childrenRoutes];
}

const Aside = () => {
	const navigate = useNavigate();
	const isMatchedLogoutPathName = useMatch('/dashboard/logout')?.pathname;

	const reactRouterPathDOM = getReactRouterPathDOM(ROUTES);

	useEffect(() => {
		if (isMatchedLogoutPathName) {
			localStorage.setItem(
				'auth',
				JSON.stringify({
					isLoggedIn: false,
				})
			);
			navigate('/');
		}
	}, [isMatchedLogoutPathName]);

	return (
		<aside className={`[ ${styles['aside']} ]`}>
			<header className={`[ ${styles['nav-menu']} ]`}>
				<menu>
					{reactRouterPathDOM.map((path, index) => {
						return (
							<li key={index}>
								<Link
									className='text-lg text-capitalize'
									to={path.link}>
									{path.text}
								</Link>
							</li>
						);
					})}
				</menu>
			</header>
		</aside>
	);
};

export default Aside;
