import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Document } from 'mongoose';

import userModel from './users.model';

import { ExpirationTime } from '@/config/jwt';
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '../../../config/env';

import { AccessToken } from './types/auth.types';

import { User, RefreshToken } from './types/user.types';
import { HttpStatus, StatusCode, ErrorMessage, SuccessMessage } from '@/types/httpStatus';

type RequestBody = User & RefreshToken;
type ResponseBodyLoginHandler = (StatusCode | AccessToken) & Partial<ErrorMessage | { expiresIn: number }>;
type ResponseBodySignUpHandler = StatusCode & Partial<ErrorMessage & SuccessMessage>;

type FoundUser = User & RefreshToken & Document;

const handleLogin = async (req: Request<{}, {}, RequestBody>, res: Response<ResponseBodyLoginHandler>) => {
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

	const foundUsername = (await userModel.findOne({ username: requestUsername }).exec()) as FoundUser;

	if (!foundUsername) return res.sendStatus(HttpStatus.UNAUTHORIZED);

	const userPassword = foundUsername.password;

	if (!userPassword) return res.sendStatus(HttpStatus.UNAUTHORIZED);

	const isMatchedPassword = await bcrypt.compare(requestPassword, userPassword);

	if (!isMatchedPassword) return res.sendStatus(HttpStatus.UNAUTHORIZED);

	const payloadToken = {
		username: foundUsername.username,
	};

	const accessToken = jwt.sign(payloadToken, ACCESS_TOKEN_SECRET, {
		expiresIn: ExpirationTime.halfSecond,
	});

	const refreshToken = jwt.sign(payloadToken, REFRESH_TOKEN_SECRET, {
		expiresIn: ExpirationTime.oneDay,
	});

	foundUsername.refreshToken = refreshToken;

	await foundUsername.save();

	const cookieOptions = {
		httpOnly: true,
		maxAge: 24 * 60 * 60 * 1000,
	};

	res.cookie('jwt', refreshToken, cookieOptions);

	return res.status(HttpStatus.OK).json({
		status: HttpStatus.OK,
		accessToken,
	});
};

const handleLogout = async (req: Request, res: Response) => {
	const cookies = req.cookies;
	const hasJwtCookies = cookies?.jwt as string;

	// status 204 =  No Content to send back
	if (!hasJwtCookies) return res.sendStatus(HttpStatus.NO_CONTENT);

	const refreshToken = cookies.jwt;

	// Is refreshToken in DB
	const foundUser = await userModel.findOne({ refreshToken }).exec();

	// Forbidden status code
	if (!foundUser) {
		res.clearCookie('jwt', {
			httpOnly: true,
			// secure: process.env.NODE === 'production' ? true : false,
			// sameSite: process.env.NODE === 'production' ? 'None' : 'Lax',
		});
		return res.sendStatus(204);
	}

	foundUser.refreshToken = '';
	// This will save to the mongoDB document that is stored in the user colletion
	const result = await foundUser.save();

	res.clearCookie('jwt', {
		httpOnly: true,
		// secure: process.env.NODE === 'production' ? true : false,
		// sameSite: process.env.NODE === 'production' ? 'None' : 'Lax',
	});

	res.sendStatus(HttpStatus.NO_CONTENT);
};

const handleSignUp = async (req: Request<{}, {}, RequestBody>, res: Response<ResponseBodySignUpHandler>) => {
	const { username: requestUsername, password: requestPassword } = req.body;

	if (!requestUsername && !requestPassword) {
		return res.status(HttpStatus.UNAUTHORIZED).json({
			status: HttpStatus.UNAUTHORIZED,
			error: {
				message: 'Username and password are required!',
			},
		});
	}

	const isDuplicatedUser = await userModel.findOne({ username: requestUsername }).exec();

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

		await userModel.create(userPayload);

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

export { handleLogin, handleLogout, handleSignUp };
