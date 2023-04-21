import RootLayouts from '@/layouts/RootLayouts';
import { Link } from 'react-router-dom';
import { Button } from '@mantine/core';

const ViewHome = () => {
	return (
		<RootLayouts>
			<Button
				component={Link}
				to='/login'
				color='teal'>
				Login
			</Button>

			<Button
				component={Link}
				to='/sign-up'
				color='teal'
				className='mt-10'>
				Sign Up
			</Button>
		</RootLayouts>
	);
};

export default ViewHome;
