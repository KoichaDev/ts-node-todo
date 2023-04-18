type Routes = {
	textContent: string;
	path: string;
};

const ROUTES: Routes[] = [
	{ textContent: 'Dashboard', path: '/dashboard' },
	{ textContent: 'Todos', path: '/dashboard/todos' },
	{ textContent: 'Logout', path: '/dashboard/logout' },
];

export default ROUTES;
