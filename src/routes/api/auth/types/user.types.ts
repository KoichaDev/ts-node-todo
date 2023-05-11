export const enum Role {
	ADMIN,
	USER,
	GUEST,
}

export type RefreshToken = {
	refreshToken: string | undefined | null;
};

export type User = {
	readonly username: string;
	readonly password: string;
};
