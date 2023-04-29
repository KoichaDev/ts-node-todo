import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { HttpStatus } from '../types/httpStatus';
import { ACCESS_TOKEN } from '../config/env';

require('dotenv').config();

type AuthenticatedRequest = Request & {
	user?: string;
};

const verifyJWT = (req: AuthenticatedRequest, res: Response, next: NextFunction): Response | void => {
	const authHeader = req.headers['authorization'];

	if (!authHeader) return res.sendStatus(HttpStatus.UNAUTHORIZED);

	const bearerToken = authHeader.split(' ').at(1);

	console.log(bearerToken);

	if (!bearerToken) {
		return res.send(HttpStatus.INTERNAL_SERVER_ERROR).json({
			status: HttpStatus.INTERNAL_SERVER_ERROR,
		});
	}
	jwt.verify(bearerToken, ACCESS_TOKEN, (error, decode) => {
		if (error) return res.sendStatus(HttpStatus.FORBIDDEN); // Invalid token

		if (decode && typeof decode === 'object') {
			req.user = decode.username;
			next();
		} else {
			return res.sendStatus(HttpStatus.FORBIDDEN); // Invalid token
		}
	});
};

export default verifyJWT;
