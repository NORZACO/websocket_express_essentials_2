const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const createError = require('http-errors'); // npm install http-errors --save-dev
const cookieParser = require('cookie-parser'); // npm install cookie-parser --save-dev
const { Server } = require("socket.io");
const server = http.createServer(app);
const socketIO = new Server(server);
const logger = require('morgan');  // npm i morgan --save-dev
const PORT = process.env.PORT || 8000

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('view engine', 'ejs'); // render te ejs template
app.use(express.static(path.join(__dirname, 'public')));


// namespace tech school
const tech = socketIO.of('/tech');




app.get('/', (request, response) => {
	response.sendFile(path.join(__dirname, 'websocket5/public/index.html'));
});

server.listen(PORT, () => {
	console.log('The server is listening on Port:', PORT, '\n');
});
// SEND 

function tech_ROOM() {
	tech.on('connection', (socket) => {
		socket.on('join', (data) => {
			// join data.room
			socket.join(data.room);
			tech.in(data.room).emit('message', `New user has  join ${data.room}`)
		})

		socket.on('message', (data) => {
			console.log(`message: ${data.msg}`);
			// tech.in(data.room).emit('message', data.msg);
			tech.in(data.room).emit('message', data.msg)
		})

		socket.on('disconnect', () => {
			console.log('user disconnected');
			tech.emit('message', 'user disconnected');
		});
	});
}

tech_ROOM();

