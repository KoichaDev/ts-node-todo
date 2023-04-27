import mongoose from 'mongoose';
require('dotenv').config();

mongoose.connection.once('open', () => console.log('⚡️ Connected to Mongo DB'));

mongoose.connection.on('error', (err) => console.error(`❌ ${err}`));

const connectMongoDB = async () => {
	try {
		const MONGO_URI = process.env.DATABASE_URI as string;

		await mongoose.connect(MONGO_URI);
	} catch (error) {
		console.log('❌', error);
	}
};

const disconnectMongoDB = async () => {
	try {
		await mongoose.disconnect();
	} catch (error) {
		console.log('❌', error);
	}
};

export { connectMongoDB, disconnectMongoDB };
