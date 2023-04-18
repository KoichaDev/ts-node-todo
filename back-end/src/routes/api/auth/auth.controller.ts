import { Request, Response } from 'express';
import users from './users.model';

type LoginRequest = {
	username: string;
	password: string;
};

const handleLogin = (req: Request<{}, {}, LoginRequest>, res: Response) => {
	const { username: requestUsername, password: requestPassword } = req.body;

	for (const user of users) {
		if (requestUsername !== user.username || requestPassword !== user.password) {
			return res.status(400).send({
				status: 400,
				error: {
					message: 'Unauthorized Access',
				},
			});
		}
	}

	return res.send({
		status: 200,
		message: 'Login successful',
	});
};

export { handleLogin };
