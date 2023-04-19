import { useEffect } from 'react';
import { Link, useMatch, useNavigate } from 'react-router-dom';
import ROUTES from './constants/routesPath';
import styles from './Aside.module.scss';

const Aside = () => {
	const navigate = useNavigate();
	const isMatchedLogoutPathName = useMatch('/dashboard/logout')?.pathname;

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
