var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

server.listen(80);

app.get('/', function (reg, res) {
    res.sendfile(__dirname + '/Canvas.html');
});

app.get('/jquery-1.9.1.min.js', function (reg, res) {
    res.sendfile(__dirname + '/jquery-1.9.1.min.js');
});


app.get('/style.css', function (reg, res) {
    res.sendfile(__dirname + '/style.css');
});
app.get('/logo.png', function (reg, res) {
    res.sendfile(__dirname + '/logo.png');
});
app.get('/trash.png', function (reg, res) {
    res.sendfile(__dirname + '/trash.png');
});
app.get('/back.jpg', function (reg, res) {
    res.sendfile(__dirname + '/back.jpg');
});


io.sockets.on('connection', function (socket) {
    //console.log(socket.request.socket.remoteAddress);
    socket.on('coords', function (data) {
        io.sockets.emit('draw', data);
    })
    socket.on('clearBoard', function (data) {
        io.sockets.emit('clear');
    })
})