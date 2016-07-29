var socket = io();
var name = getQueryVariable('name') || "Anonymous";
var room = getQueryVariable('room');

socket.on('connect', function () {
	console.log( name + ' connected to Socket.io server in room ' + room);
});

socket.on('message', function (message) {
	var momentTimestamp = moment.utc(message.timestamp);
	var $message = jQuery('.messages');
	console.log('New message:');
	console.log(moment.utc(message.timestamp).local().format('d/m/YY HH:mm') + ' - ' + message.text);

	$message.append('<p> <strong>' + message.name + '@' + momentTimestamp.local().format('h:mm a') + '</strong></p>');
	$message.append('<p>' + message.text + '</p>');
});

//read submitted form
var $form = jQuery('#message-form');

$form.on('submit', function (event) {
	event.preventDefault();

	var $message = $form.find('input[name=message]');

	socket.emit('message', {
		text: $message.val(),
		name: name
	});

	$message.val('');
});