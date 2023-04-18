import ViewDashboard from './dashboard/ViewDashboard';
import ViewTodo from './todos/ViewTodo';

const myProfileRoutes = [
	{
		path: '/dashboard',
		element: <ViewDashboard />,
		children: [
			{
				path: 'todos',
				element: <ViewTodo />,
			},
		],
	},
];

export default myProfileRoutes;
