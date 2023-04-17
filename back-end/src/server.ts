import http from 'http';
import app from './app';

const server = http.createServer(app);

async function startServer() {
	const PORT = process.env.PORT || 8000;

	server.listen(PORT, () => {
		console.log(`🚀 Listening on port ${PORT}...`);
	});
}

startServer();
