import Login from './login/Login';
import SignUp from './sign-up/SignUp';

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