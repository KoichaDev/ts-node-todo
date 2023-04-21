import fs from 'fs';
import { Users } from '../user.types';
import { USER_DATA_FILE } from '../constants/filePath';

const writeUserToFile = (users: Users[]) => {
	const jsonString = JSON.stringify(users, null, 2);

	fs.writeFileSync(USER_DATA_FILE, jsonString);
};

export { writeUserToFile };
