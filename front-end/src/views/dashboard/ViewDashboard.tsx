import { useState, useContext, useEffect } from 'react';
import { authContext } from '../../context/auth-provider';
import { useNavigate } from 'react-router-dom';

const ViewDashboard = () => {
	const { isLoggedIn } = useContext(authContext);
	const navigate = useNavigate();
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		if (isMounted && !isLoggedIn) {
			return navigate('/unauthorized');
		}

		return setIsMounted(true);
	}, [isLoggedIn, isMounted]);

	return <>{isLoggedIn && <div>View Dashboard</div>}</>;
};

export default ViewDashboard;
