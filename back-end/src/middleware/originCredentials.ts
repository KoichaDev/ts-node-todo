import { Request, Response, NextFunction } from 'express';
import { ALLOWED_ORIGINS } from '../config/cors';

// This is a middleware function that is checking the origin of the request
// and if it is in the list of allowed origins,
// it will set the Access-Control-Allow-Credentials header to true.
const originCredentials = (req: Request, res: Response, next: NextFunction) => {
	const origin = req.headers.origin as string;

	const isAllowedOrigins = ALLOWED_ORIGINS.includes(origin);

	// This is what CORS is looking for the access control allowed credentials
	if (isAllowedOrigins) {
		res.header('Access-Control-Allow-Credentials', 'true');
	}

	next();
};

export default originCredentials;
