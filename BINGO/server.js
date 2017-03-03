var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var count = 0;
var noOfConnections = 0;

server.listen(8008);

app.get('/', function (reg, res) {
    res.sendfile(__dirname + '/index.html');
});

app.get('/bingo.html', function (reg, res) {
    res.sendfile(__dirname + '/bingo.html');
});
app.get('/jquery-1.9.1.min.js', function (reg, res) {
    res.sendfile(__dirname + '/jquery-1.9.1.min.js');
});


app.get('/style.css', function (reg, res) {
    res.sendfile(__dirname + '/style.css');
});
app.get('/beep.wav', function (reg, res) {
    res.sendfile(__dirname + '/beep.wav');
});
app.get('/bootstrap.min.css', function (reg, res) {
    res.sendfile(__dirname + '/bootstrap.min.css');
});
app.get('/bingo.jpg', function (reg, res) {
    res.sendfile(__dirname + '/bingo.jpg');
});
app.get('/maxLimitReached.html', function (reg, res) {
    res.sendfile(__dirname + '/maxLimitReached.html');
});



io.sockets.on('connection', function (socket) {
    var address = socket.handshake.address;
    console.log("New connection from " + address.address + ":" + address.port);
    socket.on('coords', function (data) {
        count = count + 1;
        //console.log("[Server]:" + count + "for the data:" + data);
        io.sockets.emit('get', data);
    });
    socket.on('PlayerBingo', function () {
        io.sockets.emit('bingo');
    });
})