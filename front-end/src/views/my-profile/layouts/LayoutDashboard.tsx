import Aside from './components/Aside';
import Main from './components/Main';
import styles from './LayoutDashboard.module.scss';

type LayoutDashboardProps = {
	children: React.ReactNode;
};

const LayoutDashboard = ({ children }: LayoutDashboardProps) => {
	return (
		<div className={`[ ${styles['dashboard-layout']} ]`}>
			<Aside />
			<Main>{children}</Main>
		</div>
	);
};

export default LayoutDashboard;
