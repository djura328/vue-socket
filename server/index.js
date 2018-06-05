const server = require('http').createServer();

const io = require('socket.io')(4113, {
    path: '/',
    serveClient: false,
    // below are engine.IO options
    pingInterval: 10000,
    pingTimeout: 5000,
    cookie: false
});



io.on("connection", client => {
    //console.log("New connection!");

    client.on("channel1", newText => {
        console.log("cchannel1!");
        io.emit("channel1", {user:'pera', message:newText});
    });

    client.on("channel2", newText => {
        console.log("channel2");
        io.emit("channel2", {user:'pera', message:newText});
    });

    client.emit('statusChannel', 'You are connected!');
    client.broadcast.emit('statusChannel', 'Another client has just connected!');

    client.on('disconnect', function () {
        console.log("disconnect");
        io.emit('user disconnected');
    });

});