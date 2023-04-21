export const enum Role {
	ADMIN,
	USER,
	GUEST,
}

export type Users = {
	id?: string;
	username: string;
	password: string;
	role: Role;
};
