import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { User } from './user.types';
import { HttpStatus, StatusCode, ErrorMessage, SuccessMessage } from '@/types/httpStatus';
import usersModel from './users.model';

const handleLoginUser = async (req: Request<{}, {}, User>, res: Response<StatusCode & Partial<ErrorMessage>>) => {
	const { username: requestUsername, password: requestPassword } = req.body;

	if (!requestUsername && !requestPassword) {
		return res.status(HttpStatus.UNAUTHORIZED).json({
			status: HttpStatus.UNAUTHORIZED,
			error: {
				message: 'Username and password are required!',
			},
		});
	}

	if (!requestUsername) {
		return res.status(HttpStatus.UNAUTHORIZED).json({
			status: HttpStatus.UNAUTHORIZED,
			error: {
				message: 'Username are required!',
			},
		});
	}

	if (!requestPassword) {
		return res.status(HttpStatus.UNAUTHORIZED).json({
			status: HttpStatus.UNAUTHORIZED,
			error: {
				message: 'Password are required!',
			},
		});
	}

	const foundUser = await usersModel.findOne({ username: requestUsername }).exec();

	if (!foundUser) return res.sendStatus(HttpStatus.UNAUTHORIZED);

	const userPassword = foundUser.password;

	if (!userPassword) return res.sendStatus(HttpStatus.UNAUTHORIZED);

	const isPasswordMatched = await bcrypt.compare(requestPassword, userPassword);

	if (!isPasswordMatched) return res.sendStatus(HttpStatus.UNAUTHORIZED);

	return res.status(HttpStatus.OK).json({
		status: HttpStatus.OK,
	});
};

const handleSignUpUser = async (
	req: Request<{}, {}, User>,
	res: Response<StatusCode & Partial<ErrorMessage & SuccessMessage>>
) => {
	const { username: requestUsername, password: requestPassword } = req.body;

	if (!requestUsername && !requestPassword) {
		return res.status(HttpStatus.UNAUTHORIZED).json({
			status: HttpStatus.UNAUTHORIZED,
			error: {
				message: 'Username and password are required!',
			},
		});
	}

	const isDuplicatedUser = await usersModel.findOne({ username: requestUsername }).exec();

	if (isDuplicatedUser) {
		return res.status(HttpStatus.CONFLICT).json({
			status: HttpStatus.CONFLICT,
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

		return res.status(HttpStatus.SUCCESS).json({
			status: HttpStatus.SUCCESS,
			message: `New user ${requestUsername} has been created`,
		});
	} catch (error) {
		return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
			status: HttpStatus.INTERNAL_SERVER_ERROR,
			error: {
				message: error as Error,
			},
		});
	}
};

export { handleLoginUser, handleSignUpUser };
