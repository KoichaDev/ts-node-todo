import { useEffect } from 'react';
import { Link, useMatch, useNavigate } from 'react-router-dom';
import ROUTES from './constants/routesPath';
// import ROUTES from '@/views/my-profile/myProfileRoutes';
import _ from 'lodash';
import styles from './Aside.module.scss';
type RouterConfig = {
	path: string;
	children?: RouterConfig[];
};

function findRouterPath(routerConfig: RouterConfig): RouterConfig[] {
	const configs: RouterConfig[] = [];

	if (routerConfig.children) {
		routerConfig.children.map((child) => {
			console.log(findRouterPath(child.path));
			configs.push(...findRouterPath(child));
		});
	}

	if (!routerConfig.children) {
		configs.push(routerConfig);
	}

	return configs;
}

const Aside = () => {
	const navigate = useNavigate();
	const isMatchedLogoutPathName = useMatch('/dashboard/logout')?.pathname;

	const routes = ROUTES.flatMap(findRouterPath);

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
					{ROUTES.map((route, index) => {
						const { textContent, path } = route;
						return (
							<li key={index}>
								<Link
									className='text-lg'
									to={path}>
									{textContent}
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
