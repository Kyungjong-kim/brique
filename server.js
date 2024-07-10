import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const port = 8080;
const app = express();

// Enable CORS
app.use(
	cors({
		origin: 'http://localhost:3000', // Next.js 클라이언트가 실행되는 도메인
		methods: ['GET', 'POST'],
		allowedHeaders: ['Content-Type'],
	}),
);

// HTTP server
const httpServer = createServer(app);

// Initialize socket.io with CORS
const io = new Server(httpServer, {
	cors: {
		origin: 'http://localhost:3000', // Next.js 클라이언트가 실행되는 도메인
		methods: ['GET', 'POST'],
	},
});

io.on('connection', socket => {
	const clientAddress = socket.handshake.address;
	const clientPort = socket.conn.remotePort;
	console.log(`Connected by (${clientAddress}, ${clientPort})`);

	socket.on('request', ({ msg, id }) => {
		console.log(`Received(${id}): ${msg}`);
		setTimeout(() => {
			const responseMsg = msg.toLowerCase() === 'ping' ? `Pong` : `${msg}`;
			console.log(`Send(${id}): ${responseMsg}`);
			socket.emit('response', responseMsg);
		}, 3000);
	});
});

httpServer.listen(port, err => {
	if (err) throw err;
	console.log(`> Express server ready on http://localhost:${port}`);
});
