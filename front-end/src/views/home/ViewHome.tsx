import HomeLayout from '@/views/home/layouts/HomeLayout';
import { Link } from 'react-router-dom';
import { Button } from '@mantine/core';

const ViewHome = () => {
	return (
		<HomeLayout>
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
		</HomeLayout>
	);
};

export default ViewHome;
