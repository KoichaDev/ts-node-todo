import { Link } from 'react-router-dom';
import './Header.scss';

const Header = () => {
	const routes = [{ label: 'Logout', path: '/' }];

	const handleLogout = () => {
		localStorage.setItem(
			'auth',
			JSON.stringify({
				isLoggedIn: false,
			})
		);
	};

	return (
		<header className='[ nav-menu ]'>
			<menu>
				{routes.map((route, index) => {
					return (
						<li key={index}>
							<Link
								className='nav-menu__link'
								onClick={handleLogout}
								to={route.path}>
								{route.label}
							</Link>
						</li>
					);
				})}
			</menu>
		</header>
	);
};

export default Header;
