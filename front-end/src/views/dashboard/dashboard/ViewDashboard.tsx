import { useContext } from 'react';
import { authContext } from '../../auth/context/auth-provider';

import LayoutDashboard from '../layouts/LayoutDashboard';

const ViewDashboard = () => {
	const authCtx = useContext(authContext);

	console.log(authCtx);

	return (
		<LayoutDashboard>
			<h1 className='text-gray-300'>Dashboard</h1>
		</LayoutDashboard>
	);
};

export default ViewDashboard;
