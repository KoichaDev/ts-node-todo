import ViewDashboard from './dashboard/ViewDashboard';
import Login from '../auth/views/Login';
import ViewTodo from './todos/ViewTodo';
import ViewSettings from './settings/ViewSettings';

import TodoProvider from './todos/context/todo-provider';

const dashboardRoutes = [
	{
		path: '/dashboard',
		element: <ViewDashboard />,
		children: [
			{
				path: 'todos',
				element: (
					<TodoProvider>
						<ViewTodo />,
					</TodoProvider>
				),
			},
			{
				path: 'settings',
				element: <ViewSettings />,
			},
			{
				path: 'logout',
				element: <Login />,
			},
		],
	},
];

export default dashboardRoutes;
