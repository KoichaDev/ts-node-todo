import { useContext } from 'react';
import { authContext } from '../../context/auth-provider';

const ViewDashboard = () => {
	const { isLoggedIn } = useContext(authContext);

	console.log(isLoggedIn);

	return <div>ViewDashboard</div>;
};

export default ViewDashboard;
