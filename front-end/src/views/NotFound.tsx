import { Link } from 'react-router-dom';
import { Button } from '@mantine/core';
import { BiArrowBack } from 'react-icons/bi';

const NotFound = () => {
	return (
		<>
			<h1 className='text-4xl text-gray-400'>
				404
				<span className='text-6xl'> | </span>
				Not Found
			</h1>

			<Button
				leftIcon={<BiArrowBack />}
				component={Link}
				to='/'
				color='indigo'
				className='mt-10'>
				Go Back
			</Button>
		</>
	);
};

export default NotFound;
