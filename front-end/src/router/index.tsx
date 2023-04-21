import { createBrowserRouter } from 'react-router-dom';

// Routes
import authRoutes from '../views/auth/authRoutes';
import dashboardRoutes from '../views/dashboard/dashboardRoutes';
import unauthorizedRoutes from '@/views/unauthorized/unauthorizedRoutes';

// components
import ViewHome from '@/views/home/ViewHome';
import NotFound from '../views/NotFound';

const router = createBrowserRouter([
	{
		path: '/',
		element: <ViewHome />,
		children: [...authRoutes, { path: '*', element: <NotFound /> }],
	},
	...dashboardRoutes,
	...unauthorizedRoutes,
]);

export default router;
