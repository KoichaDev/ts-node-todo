import { Outlet } from 'react-router-dom';

import Header from '../components/Header';

type LayoutDashboardProps = {
	children: React.ReactNode;
};

const LayoutDashboard = ({ children }: LayoutDashboardProps) => {
	return (
		<main>
			<Header />
			<Outlet />
		</main>
	);
};

export default LayoutDashboard;
