


// joiningRoom
const joiningRoom = (socket) => {
    socket.on('join', (data) => {
        socket.join(data.room);
        admin.in(data.room).emit('chat message', `New user joined ${data.room} room!`);
    })
}

// sendingMessage
const sendingMessage = (data) => {
    admin.in(data.room).emit('chat message', data.msg);
}


// UserDisconnecting
const userDisconnecting = () => {
    admin.emit('chat message', 'User has left the chat');
}






admin.on('connection', joiningRoom);
socket.on('chat message', sendingMessage);
socket.on('disconnect', userDisconnecting);