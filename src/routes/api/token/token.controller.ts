import { Request, Response } from 'express';
import jwt, { VerifyCallback } from 'jsonwebtoken';

import userModel from '../auth/users.model';

import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '../../../config/env';

import { AccessToken } from '../auth/types/auth.types';

import { User } from '../auth/types/user.types';
import { HttpStatus, StatusCode, ErrorMessage } from '@/types/httpStatus';

type RequestBody = User & {
	jwt: string;
};

const handleRefreshToken = async (
	req: Request<{}, {}, RequestBody>,
	res: Response<(StatusCode | AccessToken) & Partial<ErrorMessage>>
) => {
	const cookies = req.cookies;

	if (!cookies.jwt) return res.sendStatus(HttpStatus.UNAUTHORIZED);

	const refreshToken = cookies?.jwt;

	// Not every mongoose methods needs the exec() data model, but this in particular does
	// that is because we could pass in a callback afterward like error result for example.
	// If you don't do that and you are using the async/await, then you need to put exec()
	// at the end of findOne()
	// src: https://mongoosejs.com/docs/async-await.html#queries
	const foundUser = await userModel.findOne({ refreshToken }).exec();

	if (!foundUser) return res.sendStatus(HttpStatus.FORBIDDEN);

	// evaluate JWT
	jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (error, decoded): Response | void => {
		if (error || foundUser.username !== decoded.username) {
			return res.sendStatus(403);
		}

		const jwtPayload = {
			username: decoded.username,
		};

		const accessToken = jwt.sign(jwtPayload, ACCESS_TOKEN_SECRET, {
			expiresIn: '30s',
		});

		res.json({ accessToken });
	});
};

export { handleRefreshToken };
