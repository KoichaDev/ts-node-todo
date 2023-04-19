import ViewDashboard from './dashboard/ViewDashboard';
import ViewTodo from './todos/ViewTodo';
import ViewAuth from '../auth/ViewAuth';

import TodoProvider from './todos/context/todo-provider';

const myProfileRoutes = [
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
				path: 'logout',
				element: <ViewAuth />,
			},
		],
	},
];

export default myProfileRoutes;
