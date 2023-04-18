import { Link } from 'react-router-dom';
import ROUTES from '../../constants/routesPath';
import styles from './Aside.module.scss';

const Aside = () => {
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
					{ROUTES.map((route, index) => {
						const { textContent, path } = route;
						return (
							<li key={index}>
								<Link
									className='text-lg'
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
