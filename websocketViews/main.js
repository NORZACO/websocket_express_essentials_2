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





app.get('/', (req, res) => {
    res.render(__dirname + '/public/room.ejs', {room: 'room1'});
});

app.get('/room2', (req, res) => {
    res.render(__dirname + '/room.ejs', {room: 'room2'});
});







server.listen(PORT, () => {
    console.log('The server is listening on Port:', PORT, '\n');
});
