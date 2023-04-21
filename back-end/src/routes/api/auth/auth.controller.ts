import { Request, Response } from 'express';
import fs from 'fs';
import crypto from 'crypto';
import users from './users.model';
import { writeUserToFile } from './helpers/userFileSystem';
import { USER_DATA_FILE } from './constants/filePath';

type User = {
	username: string;
	password: string;
};

type LoginResponse = Partial<User> & {
	status: number;
	message?: string;
	error?: {
		message: string;
	};
};

const handleLogin = (req: Request<{}, {}, User>, res: Response<LoginResponse>) => {
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

const handleSignUp = (req: Request<{}, {}, User>, res: Response<LoginResponse>) => {
	const { username, password } = req.body;

	if (username.length === 0 && password.length === 0) {
		return res.status(400).send({
			status: 400,
			error: {
				message: 'Require username and password',
			},
		});
	}

	if (username.length === 0) {
		return res.status(400).send({
			status: 400,
			error: {
				message: 'Require username',
			},
		});
	}

	if (password.length === 0) {
		return res.status(400).send({
			status: 400,
			error: {
				message: 'Require password',
			},
		});
	}

	fs.access(USER_DATA_FILE, (err) => {
		const newUser = { id: crypto.randomUUID(), username, password, role: 1 };
		if (err) {
			writeUserToFile([newUser]);
		}

		const fixtureUserData = require('./fixtures/users.json');
		const users = [...fixtureUserData, newUser];

		writeUserToFile(users);

		return res.status(201).send({
			status: 201,
			message: 'Successful',
		});
	});
};

export { handleLogin, handleSignUp };
