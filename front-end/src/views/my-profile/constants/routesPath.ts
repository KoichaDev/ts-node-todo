type Routes = {
	textContent: string;
	path: string;
};

const ROUTES: Routes[] = [
	{ textContent: 'Dashboard', path: '/dashboard' },
	{ textContent: 'Todos', path: '/dashboard/todos' },
	{ textContent: 'Logout', path: '/' },
];

export default ROUTES;