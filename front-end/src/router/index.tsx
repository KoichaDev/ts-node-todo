import { createBrowserRouter } from 'react-router-dom';
import authRoutes from '../views/auth/authRoutes';
import dashboardRoutes from '../views/dashboard/dashboardRoutes';
import unauthorizedRoutes from '@/views/unauthorized/unauthorizedRoutes';
import NotFound from '../views/NotFound';

const router = createBrowserRouter([
	{ errorElement: <NotFound /> },
	...authRoutes,
	...dashboardRoutes,
	...unauthorizedRoutes,
]);

export default router;
