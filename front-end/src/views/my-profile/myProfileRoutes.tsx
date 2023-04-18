import ViewDashboard from './dashboard/ViewDashboard';
import ViewTodo from './todos/ViewTodo';
import ViewAuth from '../auth/ViewAuth';
const myProfileRoutes = [
	{
		path: '/dashboard',
		element: <ViewDashboard />,
		children: [
			{
				path: 'todos',
				element: <ViewTodo />,
			},
			{
				path: 'logout',
				element: <ViewAuth />,
			},
		],
	},
];

export default myProfileRoutes;
