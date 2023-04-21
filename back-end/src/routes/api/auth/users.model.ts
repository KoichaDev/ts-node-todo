import crypto from 'crypto';
import { Users, Role } from './user.types';

const users: Users[] = [
	{
		id: crypto.randomUUID(),
		username: 'admin',
		password: 'admin',
		role: Role.ADMIN,
	},
	{
		id: crypto.randomUUID(),
		username: 'user',
		password: 'user',
		role: Role.USER,
	},
	{
		id: crypto.randomUUID(),
		username: 'guest',
		password: 'guest',
		role: Role.GUEST,
	},
];

export default users;
