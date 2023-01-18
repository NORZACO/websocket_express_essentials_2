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





app.get('/', (request, response) => {
    // response.sendFile(__dirname, '/public/index.html');
    response.sendFile(path.join(__dirname, '/public/index.html'))
});



app.get('/websocket1', (request, response) => {
    response.sendFile(path.join(__dirname, '/websocket1/index.html'));
});

socketIO.on('connection', (socket) => {
    console.log('user 1 connected');
    socket.emit('message', { MAIN_SERVER : 'MAIN SERVER'.toLowerCase() });
    socket.on('another event', (data) => {
        console.log(data);
    })
})











server.listen(PORT, () => {
    console.log('The server is listening on Port:', PORT, '\n');
    // localhost
    console.log(`http://localhost:${PORT}/`);
});