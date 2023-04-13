import { createBrowserRouter } from 'react-router-dom';
import loginRoutes from '../views/login/loginRoutes';

const router = createBrowserRouter([...loginRoutes]);

export default router;
