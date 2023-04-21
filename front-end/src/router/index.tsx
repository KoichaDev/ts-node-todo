import { createBrowserRouter } from 'react-router-dom';
import loginRoutes from '../views/auth/loginRoutes';
import myProfileRoutes from '../views/dashboard/myProfileRoutes';
import unauthorizedRoutes from '@/views/unauthorized/unauthorizedRoutes';
import NotFound from '../views/NotFound';

const router = createBrowserRouter([
	{ errorElement: <NotFound /> },
	...loginRoutes,
	...myProfileRoutes,
	...unauthorizedRoutes,
]);

export default router;
