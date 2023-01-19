const express = require('express');
const app = express();
const fs = require('fs');
const http = require('http');
const path = require('path');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const { Server } = require("socket.io");
const server = http.createServer(app);
const socketIO = new Server(server);
const logger = require('morgan');
const PORT = process.env.PORT || 3000
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

const administration = socketIO.of("/admin");

app.get('/v1', (req, res) => {
    res.render(__dirname +  '/public/index.ejs', {rooms: rooms});
});

app.post('/newroom', jsonParser, (req, res) => {
    const room = req.body.room;
    app.get('/' + room, (req, res) => {
        res.render(__dirname + '/public/index.ejs', {room: room});
    });

    if(!rooms.includes(req.body.room)) {
        rooms.push(room);
        if(req.body.save) {
            let rooms = JSON.parse(fs.readFileSync('./rooms.json', 'utf-8'));
            const newRooms =  rooms.concat([req.body.room]);
            fs.writeFileSync("./rooms.json", JSON.stringify(newRooms));
        }
        res.send({
            'room': room
        });
    } else {
        res.send({
            'error': 'room already exists'
        });
    }
});


administration.on('connection', (socket) => {
    socket.on('join', (data) => {
        socket.join(data.room);
        administration.in(data.room).emit('chat message', `New user joined ${data.room} room!`);
    });

    socket.on('chat message', (data) => {
        administration.in(data.room).emit('chat message', data.msg);
    });

    socket.on('disconnect', () => {
        administration.emit('chat message', 'user disconnected');
    });
});

server.listen(PORT, () => {
    console.log('The server is listening on Port:', PORT, '\n');
});
