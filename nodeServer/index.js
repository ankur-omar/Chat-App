// node server which will handle socket io connection

const io = require('socket.io')(80)
const users = {};
io.on('connection', socket => {// this is a server listen to incoming event
    // if any new users joins let other  user connected to the server know
    socket.on('new-user-joined', name => {// handle particular connection
        console.log("New User", name)
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    })
    // if someone sends a message brodcast it to other people

    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] })
    });
    //  if someone leave the chat let to know the other users

    socket.on('disconnect', message => {
        socket.broadcast.emit('left', users[socket.id])
        delete users[socket.id]
    });

})
