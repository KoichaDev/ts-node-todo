import LayoutDashboard from '../layouts/LayoutDashboard';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import useChart from './hooks/useChart';
ChartJS.register(ArcElement, Tooltip, Legend);

const ViewDashboard = () => {
	const { getTodoDataCompletion } = useChart();

	return (
		<LayoutDashboard>
			<h1 className='text-gray-300'>Dashboard</h1>
			<hr className='my-10' />
			<div
				className='my-5'
				style={{ width: '25%' }}>
				<h2 className='text-gray-300'>Todo Completion</h2>
				<Doughnut
					data={getTodoDataCompletion()}
					className='mt-10 w-max-full'
				/>
			</div>
		</LayoutDashboard>
	);
};

export default ViewDashboard;
