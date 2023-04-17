import { createBrowserRouter } from 'react-router-dom';
import loginRoutes from '../views/login/loginRoutes';
import ViewDashboard from '../views/dashboard/dashboardRoutes';
import unauthorizedRoutes from '@/views/unauthorized/unauthorizedRoutes';
import NotFound from '../views/NotFound';

const router = createBrowserRouter([
	{ errorElement: <NotFound /> },
	...loginRoutes,
	...ViewDashboard,
	...unauthorizedRoutes,
]);

export default router;
