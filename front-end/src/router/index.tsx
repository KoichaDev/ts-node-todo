import { createBrowserRouter } from 'react-router-dom';
import ViewHomePage from '@/views/homepage/ViewHomePage';
import authRoutes from '../views/auth/authRoutes';
import dashboardRoutes from '../views/dashboard/dashboardRoutes';
import unauthorizedRoutes from '@/views/unauthorized/unauthorizedRoutes';
import NotFound from '../views/NotFound';

const router = createBrowserRouter([
	{
		path: '/',
		element: <ViewHomePage />,
		errorElement: <NotFound />,
		children: [...authRoutes],
	},
	...dashboardRoutes,
	...unauthorizedRoutes,
]);

export default router;
