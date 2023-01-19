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
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('view engine', 'ejs'); // render te ejs template
app.use(express.static(path.join(__dirname, 'public')));


// namespace tech school javascript
const administration = socketIO.of("/admin");




app.get('/home', (request, response) => {
    response.sendFile(path.join(__dirname, '/public/home.html'));
});

app.get('/room1', (request, response) => {
    response.sendFile(path.join(__dirname, '/public/room1.html'));
});


app.get('/room2', (request, response) => {
    response.sendFile(path.join(__dirname, '/public/room2.html'));
});

app.get('/room3', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/room3.html'));
});

app.get('/room4', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/room4.html'));
});

// TEMPLATE ENGINE
app.get('/', (req, res) => {
    res.render(__dirname +  '/public/index.ejs', {room: 'stue'});
});


// POST NEWROOT && GET NEWROOM \\ USING POSTMAN + BODY + JSON { room : newroom }
app.post('/newroom', jsonParser, (req, res) => {
    const room = req.body.room;
    app.get('/' + room, (req, res) => {
        res.render(__dirname + '/public/index.ejs', {room: room});
    });
    res.send({
        'room': room
    });
})



administration.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        administration.emit('chat message', msg);
    });
})

administration.on('connection', (socket) => {
    socket.on('join', (data) => {
        socket.join(data.room);
        administration.in(data.room).emit('chat message', `New user joined ${data.room} room!`);
    })

    socket.on('chat message', (data) => {
        administration.in(data.room).emit('chat message', data.msg);
    });

    socket.on('disconnect', () => {
        administration.emit('chat message', 'user disconnected');
    })
});


server.listen(PORT, () => {
    console.log('The server is listening on Port:', PORT, '\n');
});
