export type User = {
	username: string;
	password: string;
};

export type AuthSuccess = {
	status: number;
	message: string;
};

export type AuthError = {
	response: {
		data: {
			error: {
				message: string;
			};
		};
	};
};
