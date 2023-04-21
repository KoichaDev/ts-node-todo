import { Request, Response } from 'express';
import users from './users.model';

type LoginRequest = {
	username: string;
	password: string;
};

type LoginResponse = Partial<LoginRequest> & {
	status: number;
	message?: string;
	error?: {
		message: string;
	};
};

const handleLogin = (req: Request<{}, {}, LoginRequest>, res: Response<LoginResponse>) => {
	const { username: requestUsername, password: requestPassword } = req.body;

	const user = users.find((user) => user.username === requestUsername && user.password === requestPassword);

	if (user) {
		return res.send({
			status: 200,
			message: 'Login successful',
		});
	}

	return res.status(400).send({
		status: 400,
		error: {
			message: 'Unauthorized Access',
		},
	});
};

export { handleLogin };
