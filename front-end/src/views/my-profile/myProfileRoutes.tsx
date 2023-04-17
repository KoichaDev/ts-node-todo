import ViewDashboard from './dashboard/ViewDashboard';
const myProfileRoutes = [
	{
		path: '/dashboard',
		element: <ViewDashboard />,
		children: [
			{
				path: 'todo',
			},
		],
	},
];

export default myProfileRoutes;
