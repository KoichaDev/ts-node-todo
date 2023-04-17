import { Link } from 'react-router-dom';
import './Header.scss';

const Header = () => {
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
		<header className='[ nav-menu ]'>
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
	);
};

export default Header;
