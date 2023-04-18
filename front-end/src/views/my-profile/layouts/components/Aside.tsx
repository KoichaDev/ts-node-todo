import { Link } from 'react-router-dom';

import styles from './Aside.module.scss';

const Aside = () => {
	const routes = [{ textContent: 'Logout', path: '/' }];

	const handleLogout = () => {
		localStorage.setItem(
			'auth',
			JSON.stringify({
				isLoggedIn: false,
			})
		);
	};
	return (
		<aside className={`[ ${styles['aside']} ]`}>
			<header className={`[ ${styles['nav-menu']} ]`}>
				<menu>
					{routes.map((route, index) => {
						const { textContent, path } = route;
						return (
							<li key={index}>
								<Link
									className='nav-menu__link'
									onClick={handleLogout}
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
