export const enum HttpStatus {
	OK = 200,
	SUCCESS = 201,
	NO_CONTENT = 204,
	BAD_REQUEST = 400,
	UNAUTHORIZED = 401,
	FORBIDDEN = 403,
	CONFLICT = 409,
	INTERNAL_SERVER_ERROR = 500,
}

export type StatusCode = {
	status: number;
};

export type ErrorMessage = {
	error: {
		message: string | Error;
	};
};

export type SuccessMessage = {
	message: string;
};
