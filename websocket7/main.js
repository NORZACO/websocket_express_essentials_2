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


// namespace tech school javascript
const techIO = socketIO.of('/tech');
const schoolIO = socketIO.of('/school');
const javascriptIO = socketIO.of('/javascript');





app.get('/', (request, response) => {
	response.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/javascript', (request, response) => {
	response.sendFile(path.join(__dirname, '/public/javascript.html'));
});

app.get('/tech', (request, response) => {
	response.sendFile(path.join(__dirname, '/public/tech.html'));
});


app.get('/school', (request, response) => {
	response.sendFile(path.join(__dirname, '/public/school.html'));
});



function tech_ROOM() {
	techIO.on('connection', (socket) => {
		socket.on('join', (data) => {
			// join data.room
			socket.join(data.room);
			techIO.in(data.room).emit('message', `New user has  join ${data.room}`)
		})

		socket.on('message', (data) => {
			console.log(`message: ${data.msg}`);
			// tech.in(data.room).emit('message', data.msg);
			techIO.in(data.room).emit('message', data.msg)
		})

		socket.on('disconnect', () => {
			console.log('user disconnected');
			techIO.emit('message', 'user disconnected');
		});
	});
}

tech_ROOM();


function school_ROOM() {
	schoolIO.on('connection', (socket) => {
		socket.on('join', (data) => {
			// join data.room
			socket.join(data.room);
			schoolIO.in(data.room).emit('message', `New user has  join ${data.room}`)
		})

		socket.on('message', (data) => {
			console.log(`message: ${data.msg}`);
			// tech.in(data.room).emit('message', data.msg);
			schoolIO.in(data.room).emit('message', data.msg)
		})

		socket.on('disconnect', () => {
			console.log('user disconnected');
			schoolIO.emit('message', 'user disconnected');
		});
	});
}

school_ROOM();


function javascript_ROOM() {
	javascriptIO.on('connection', (socket) => {
		socket.on('join', (data) => {
			// join data.room
			socket.join(data.room);
			javascriptIO.in(data.room).emit('message', `New user has  join ${data.room}`)
		})

		socket.on('message', (data) => {
			console.log(`message: ${data.msg}`);
			// tech.in(data.room).emit('message', data.msg);
			javascriptIO.in(data.room).emit('message', data.msg)
		})

		socket.on('disconnect', () => {
			console.log('user disconnected');
			javascriptIO.emit('message', 'user disconnected');
		}
		);
	});
}

javascript_ROOM();

server.listen(PORT, () => {
	console.log('The server is listening on Port:', PORT, '\n');
});
// -------------------------------------------------------- Path: websocket6\public\javascript.html -----------------------------------------------------

/*
// room namespace
function room_TECH() {
	const room = 'javascript'
	const socket = io('/tech');
	$('form').submit(() => {
		let msg = $('#m').val()
		socket.emit('message', { msg, room });
		$('#m').val('');
		return false;
	})
	
	socket.on('connect', () => {
		// emitting to everyone
		//socket.emit('message', 'user connected in the browser')
		socket.emit('join', { room: room })
	})
	
	// listen to message event
	socket.on('message', (msg) => {
		$('#messages').addClass("list-group-item list-group-item-primary");
		$('#messages').append($('<li>').text(msg));
		//console.log(msg)
	})
}

room_TECH();

function room_SCHOOL() {
	const room = 'school'
	const socket = io('/school');
	$('form').submit(() => {
		let msg = $('#m').val()
		socket.emit('message', { msg, room });
		$('#m').val('');
		return false;
	})
	
	socket.on('connect', () => {
		// emitting to everyone
		//socket.emit('message', 'user connected in the browser')
		socket.emit('join', { room: room })
	})
	
	// listen to message event
	socket.on('message', (msg) => {
		$('#messages').addClass("list-group-item list-group-item-primary");
		$('#messages').append($('<li>').text(msg));
		//console.log(msg)
	})
}
room_SCHOOL();



function room_JAVASCRIPT() {
	const room = 'javascript'
	const socket = io('/javascript');
	$('form').submit(() => {
		let msg = $('#m').val()
		socket.emit('message', { msg, room });
		$('#m').val('');
		return false;
	})
	
	socket.on('connect', () => {
		// emitting to everyone
		//socket.emit('message', 'user connected in the browser')
		socket.emit('join', { room: room })
	})
	
	// listen to message event
	socket.on('message', (msg) => {
		$('#messages').addClass("list-group-item list-group-item-primary");
		$('#messages').append($('<li>').text(msg));
		//console.log(msg)
	})
}

room_JAVASCRIPT();

*/



