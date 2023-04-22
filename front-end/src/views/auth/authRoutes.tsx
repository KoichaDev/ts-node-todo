import Login from './views/Login';
import SignUp from './views/SignUp';

const authRoutes = [
	{
		path: 'login',
		element: <Login />,
	},
	{
		path: 'sign-up',
		element: <SignUp />,
	},
];

export default authRoutes;
