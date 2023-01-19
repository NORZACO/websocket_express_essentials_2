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

app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('view engine', 'ejs'); // render te ejs template
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));







app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});


app.use(express.static("public"));




socketIO.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

socketIO.on('connection', (socket) => {
  socket.on('chat-message', (msg) => {
    console.log(`message: ${msg}`);
  });
});


socketIO.on('connection', (socket) => {
  socket.on('chat-message', (msg) => {
    socketIO.emit('chat-message', msg);
  });
});



app.post('/newroom', jsonParser, (req, res) => {
  const room = req.body.room;
  app.get('/' + room, (req, res) => {
    res.render(__dirname + '/public/room.ejs', { room: room });
  });
  res.send({
    'room': room
  });
})




// app.get('/:room1', (request, response) => {
//   response.render(__dirname + '/public/index.ejs', { room: request.room1 });
// });

app.get('/room2', (req, res) => {
  res.render(__dirname + '/public/index.ejs', { room: 'room2' });
});


app.get('/home', (req, res) => {
  res.render(__dirname + '/public/index.ejs', { room: 'room2' });
});







server.listen(PORT, () => {
  console.log('The server is listening on Port:', PORT, '\n');
  console.log('go to the http://127.0.0.1:3000');
});



