import http from 'http';
import app from './app';
import { connectMongoDB, disconnectMongoDB } from './services/mongo';

const server = http.createServer(app);

async function startServer() {
	const PORT = process.env.PORT || 8000;

	await connectMongoDB();

	server.listen(PORT, () => console.log(`🚀 Listening on port ${PORT}...`));
}

startServer();
