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



app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, 'websocket2/public/index.html'));
});

server.listen(PORT, () => {
    console.log('The server is listening on Port:', PORT, '\n');
});
// SEND 
// socketIO.on('connection', (socket) => {
//     console.log('connection to user succefull');
//     socket.on('message', (msg) => {
//         console.log(`message : ${msg}`);
//         socketIO.emit('message', msg);
//     })
// })


socketIO.on('connection', (socket) => {
    console.log('user connected');
    socket.on('message', (msg) => {
        console.log(`message: ${msg}`);
        socketIO.emit('message', msg);
    })
})


function SendMessages(params) {
	const socket = io();
	$('form').submit(() => {
	  socket.emit('message', $('#m').val());
	  $('#m').val('');
	  return false;
	})
	// listen to message event
	socket.on('message', (msg) => {
	  $('#messages').append($('<li>').text(msg));
	  //console.log(msg)
	})
}
