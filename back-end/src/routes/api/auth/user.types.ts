export const enum Role {
	ADMIN,
	USER,
	GUEST,
}

export type User = {
	readonly id?: string;
	readonly username: string;
	readonly password: string;
	readonly role: Role;
};
