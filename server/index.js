const server = require('http').createServer();

const io = require('socket.io')(4113, {
    path: '/',
    serveClient: false,
    // below are engine.IO options
    pingInterval: 10000,
    pingTimeout: 5000,
    cookie: false
});


let numClients = 0;

io.on("connection", client => {
    //console.log("New connection!");
    numClients++

    client.on("channel1", newText => {
        console.log("cchannel1!");
        io.emit("channel1", {user:'pera', message:newText});
    });

    client.on("channel2", newText => {
        console.log("channel2");
        io.emit("channel2", {user:'pera', message:newText});
    });

    client.emit('statusChannel', 'You are connected! Connected user: ' + numClients);
    client.broadcast.emit('statusChannel', 'Another client has just connected! Connected user: ' + numClients );

    client.on('disconnect', function () {
        numClients--
        console.log("disconnect");
        client.broadcast.emit('statusChannel', 'Another client has just connected out! Connected user: ' + numClients );
        io.emit('user disconnected');
    });

});