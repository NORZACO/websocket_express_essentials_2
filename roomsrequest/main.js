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


app.post('/getroom', jsonParser, (req, res) => {
    const room = req.body.room;
    app.get('/' + room, (req, res) => {
        res.render(__dirname + '/room.ejs', {room: room});
    });

    res.send({'room': room});
})





function V1(params) {
	app.post('/newroom', jsonParser, (req, res) => {
	    // Get the room name from the request body
	    const room = req.body.room;
	      // Get the color name from the request body
	    const color = 'req.body.color;'
	    // Object of color and room
	    const roomColor = {
	        'room': room,
	        'color': color
	    };
	
	
	    // Add a new route for the room
	    app.get('/' + roomColor.room, (req, res) => {
	        // Render the room.ejs file and pass in the room name as a parameter
	        res.render(__dirname + 'public/room.ejs', { 
                room: roomColor.room,
                color: roomColor.color
            });
	    });
	
	    // Send a response with the room name
	    res.send({
	        'room': roomColor.room,
	        'color': roomColor.color
	    });
	});
}


// app.get('/room1', (req, res) => {
//     res.render(__dirname + '/public/room.ejs', {room: 'room1'});
// });

// app.get('/room2', (req, res) => {
//     res.render(__dirname + '/public/room.ejs', {room: 'room2'});
// });



app.post('/newroom', jsonParser, (req, res) => {
    // Get the room name and color from the request body
    const room = req.body.room;
    const color = req.body.color || 'white'; // Default color is white if none is provided

    // Add a new route for the room
    app.get('/' + room, (req, res) => {
        // Render the room.ejs file and pass in the room name and color as parameters
        res.render(__dirname + '/public/room.ejs', {room: room, color: color});
    });

    // Send a response with the room name and color
    res.send({
        'room': room,
        'color': color
    });
});

// Existing GET handlers for '/room1' and '/room2' should remain unchanged
app.get('/', (req, res) => {
    res.render(__dirname + '/public/room.ejs', {room: 'room1'});
});
app.get('/room2', (req, res) => {
    res.render(__dirname + '/public/room.ejs', {room: 'room2'});
});






// // add class
// $('#messages').addClass("list-group-item list-group-item-primary");
// // add color
// $('#messages').css('background-color', 'red');
// // add color to odd
// $('#messages li:odd').css('background-color', 'red');











server.listen(PORT, () => {
    console.log('The server is listening on Port:', PORT, '\n');
});



