import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { Users } from './user.types';
import usersModel from './users.model';

const handleLoginUser = async (req: Request<{}, {}, Users>, res: Response) => {
	const { username: requestUsername, password: requestPassword } = req.body;

	if (!requestUsername && !requestPassword) {
		return res.status(401).json({
			status: 401,
			error: {
				message: 'Username and password are required!',
			},
		});
	}

	if (!requestUsername) {
		return res.status(401).json({
			status: 401,
			error: {
				message: 'Username are required!',
			},
		});
	}

	if (!requestPassword) {
		return res.status(401).json({
			status: 401,
			error: {
				message: 'Password are required!',
			},
		});
	}

	const foundUser = await usersModel.findOne({ username: requestUsername }).exec();

	if (!foundUser) return res.sendStatus(401);

	const userPassword = foundUser.password;

	if (!userPassword) return res.sendStatus(401);

	const isPasswordMatched = await bcrypt.compare(requestPassword, userPassword);

	if (!isPasswordMatched) return res.sendStatus(401);

	return res.status(200).json({
		status: 200,
	});
};

const handleSignUpUser = async (req: Request, res: Response) => {
	const { username: requestUsername, password: requestPassword } = req.body;

	if (!requestUsername && !requestPassword) {
		return res.status(401).json({
			status: 401,
			error: {
				message: 'Username and password are required!',
			},
		});
	}

	const isDuplicatedUser = await usersModel.findOne({ username: requestUsername }).exec();

	if (isDuplicatedUser) {
		return res.status(409).json({
			status: 409,
			error: {
				message: `username ${requestPassword} exist`,
			},
		});
	}

	try {
		const SALT_ROUND = 14;
		const hashedPassword = await bcrypt.hash(requestPassword, SALT_ROUND);

		const userPayload = {
			username: requestUsername,
			password: hashedPassword,
		};

		await usersModel.create(userPayload);

		return res.status(201).json({
			status: 201,
			message: `New user ${requestUsername} has been created`,
		});
	} catch (error) {
		return res.send(500).json({
			status: 500,
			error: {
				message: error,
			},
		});
	}
};

export { handleLoginUser, handleSignUpUser };
