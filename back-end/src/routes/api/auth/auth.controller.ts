import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import userDB from './users.model';

import { ExpirationTime } from '@/config/jwt';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../../config/env';

import { AccessToken } from './types/auth.types';

import { User } from './types/user.types';
import { HttpStatus, StatusCode, ErrorMessage, SuccessMessage } from '@/types/httpStatus';

const handleLoginUser = async (
	req: Request<{}, {}, User>,
	res: Response<(StatusCode | AccessToken) & Partial<ErrorMessage>>
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

	const foundUsername = await userDB.findOne({ username: requestUsername }).exec();

	if (!foundUsername) return res.sendStatus(HttpStatus.UNAUTHORIZED);

	const userPassword = foundUsername.password;

	if (!userPassword) return res.sendStatus(HttpStatus.UNAUTHORIZED);

	const isPasswordMatched = await bcrypt.compare(requestPassword, userPassword);

	if (!isPasswordMatched) return res.sendStatus(HttpStatus.UNAUTHORIZED);

	const payloadToken = {
		username: foundUsername,
	};

	const accessToken = jwt.sign(payloadToken, ACCESS_TOKEN, {
		expiresIn: ExpirationTime.halfSecond,
	});

	const refreshToken = jwt.sign(payloadToken, REFRESH_TOKEN, {
		expiresIn: ExpirationTime.oneDay,
	});

	// const otherUser = userDB.users.filter((person) => person.username !== foundUsername.userName);
	// const currentUser = { ...foundUsername, refreshToken };

	res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });

	return res.status(HttpStatus.OK).json({
		status: HttpStatus.OK,
		accessToken,
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

	const isDuplicatedUser = await userDB.findOne({ username: requestUsername }).exec();

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

		await userDB.create(userPayload);

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
