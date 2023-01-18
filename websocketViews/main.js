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
const PORT = process.env.PORT || 3000

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('view engine', 'ejs'); // render te ejs template
app.use(express.static(path.join(__dirname, 'public')));

// namespace for admin
const admin = socketIO.of('/admin');

var rooms = [   { home : 'home' }, { room: 'room1' },   { room: 'room2' },   { room: 'room3' },   { room: 'room4' },   { room: 'room5' }]
console.log(rooms);




app.get(`/${rooms[0].home}`, (req, res) => {
    res.render(__dirname + '/public/room.ejs', rooms[1]);
});

app.get(`/${rooms[1].room}`,  (req, res) => {
    res.render(__dirname + '/public/room.ejs', rooms[2]);
});


app.get(`/${rooms[2].room}`,  (req, res) => {
    res.render(__dirname + '/public/room.ejs', rooms[3]);
});


app.get(`/${rooms[3].room}`,  (req, res) => {
    res.render(__dirname + '/public/room.ejs', rooms[4]);
});


app.get(`/${rooms[4].room}`,  (req, res) => {
    res.render(__dirname + '/public/room.ejs', rooms[5]);
});


app.get(`/:room`,  (request, response) => {
    response.render(__dirname + '/public/room.ejs', { room: request.room });
});


server.listen(PORT, () => {
    console.log('The server is listening on Port:', PORT, '\n');
});



// socketIO.on('connection', (socket) => {
//     console.log('a user connected');
//     socket.on('disconnect', () => {
//         console.log('user disconnected');
//     });
//     socket.on('chat message', (msg) => {
//         console.log('message: ' + msg);
//         socketIO.emit('chat message', msg);
//     });
// });


// admin.on('connection', (socket) => {
//     socket.on('join', (data) => {
//         socket.join(data.room);
//         admin.in(data.room).emit('chat message', `New user joined ${data.room} room!`);
//     })

//     socket.on('chat message', (data) => {
//         admin.in(data.room).emit('chat message', data.msg);
//     });

//     socket.on('disconnect', () => {
//         admin.emit('chat message', 'user disconnected');
//     })
// });


// // joiningRoom
// const joiningRoom = (socket) => {
//     socket.on('join', (data) => {
//         socket.join(data.room);
//         admin.in(data.room).emit('chat message', `New user joined ${data.room} room!`);
//     })
// }

// // sendingMessage
// const sendingMessage = (data) => {
//     admin.in(data.room).emit('chat message', data.msg);
// }

// // UserDisconnecting
// const userDisconnecting = () => {
//     admin.emit('chat message', 'User has left the chat');
// }




// const joiningRoom = (socket) => socket.on('join', (data) => {
//     socket.join(data.room);
//     admin.in(data.room).emit('chat message', `New user joined ${data.room} room!`);
// });

const joiningRoom = (socket) => {
    console.log(`User message id: ${socket.id}`);

    socket.on('join', (data) => {
        socket.join(data.room);
        admin.in(data.room).emit('chat message', `New user joined ${data.room} room!`);
    });
};

const sendingMessage = (data) => admin.in(data.room).emit('chat message', data.msg);

const userDisconnecting = () => admin.emit('chat message', 'User has left the chat');


admin.on('connection', joiningRoom);
socketIO.on('chat message', sendingMessage);
socketIO.on('disconnect', userDisconnecting);
