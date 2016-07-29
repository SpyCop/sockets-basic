var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var moment = require('moment');

app.use(express.static(__dirname + '/public'));

io.on('connection', function (socket) {
	console.log('User connected via Socket.io');

	socket.on('message', function (message) {
		message.timestamp = moment().valueOf();
		console.log('Message received:' + message.name + '@' + moment.utc(message.timestamp).local().format('d/m/YYYY HH:mm') +': ' +  message.text);
		io.emit('message', message);
	});

	socket.emit('message', {
		text: "Welcome to the chat app!",
		timestamp: moment().valueOf(),
		name: "The System"
	});
});

http.listen(PORT, function () {
	console.log('Server started');
});