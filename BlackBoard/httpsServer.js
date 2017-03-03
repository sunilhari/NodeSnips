var WebSocketServer = require('websocket').server;
var express = require('express');
var app = express();
var fs = require('fs');
var options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};
var server = require('https').createServer(options,app).listen(443);

wsServer = new WebSocketServer({
    httpServer: server
});

function sendCallback(err) {
    if (err) console.error("send() error: " + err);
}

app.get('/', function(reg, res){
	res.sendfile(__dirname + '/Canvas.html');
});

app.get('/jquery-1.9.1.min.js', function(reg, res){
	res.sendfile(__dirname + '/jquery-1.9.1.min.js');
});


app.get('/style.css', function(reg, res){
	res.sendfile(__dirname + '/style.css');
});
app.get('/logo.png', function(reg, res){
	res.sendfile(__dirname + '/logo.png');
});
app.get('/text.png', function(reg, res){
	res.sendfile(__dirname + '/text.png');
});
app.get('/back.jpg', function(reg, res){
	res.sendfile(__dirname + '/back.jpg');
});


// io.sockets.on('connection', function(socket){
	// console.log("entered....");
	// socket.on('coords', function(data){
		// io.sockets.emit('draw',data);
	// })
// })

wsServer.on('request', function(request) {
    console.log((new Date()) + ' Connection from origin ' + request.origin + '.');
    var connection = request.accept(null, request.origin);
    console.log(' Connection ' + connection.remoteAddress);
    clients.push(connection);

    // This is the most important callback for us, we'll handle
    // all messages from users here.
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            // process WebSocket message
            console.log((new Date()) + ' Received Message ' + message.utf8Data);
            // broadcast message to all connected clients
            clients.forEach(function (outputConnection) {
                if (outputConnection != connection) {
                  outputConnection.send(message.utf8Data, sendCallback);
                }
            });
        }
    });

    connection.on('close', function(connection) {
        // close user connection
        console.log((new Date()) + " Peer disconnected.");        
    });
}); 
