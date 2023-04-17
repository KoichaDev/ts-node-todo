import { createBrowserRouter } from 'react-router-dom';
import loginRoutes from '../views/login/loginRoutes';
import ViewDashboard from '../views/dashboard/dashboardRoutes';

const router = createBrowserRouter([...loginRoutes, ...ViewDashboard]);

export default router;
