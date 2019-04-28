var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    // res.sendFile(__dirname + '/index.html');
    res.sendFile(__dirname + '/');
});

io.on('connection', function(socket){
	console.log('someone connected!');
	socket.on('chat message', function(date, name, message) {
        var messageHtml =   '<p>' +
							'<span class="name">' + name + ' - ' + date + '</span> ' +
							'<span class="msg">' + message + '</span> ' +
            				'</p>';
        // var messageString = '<span class="msg">' + name + '</span> '+ date + " : " + message;
		console.log(messageHtml);
		io.emit('chat message', messageHtml);
	});
});

http.listen(8080, function(){
	console.log('listening on port 8080');
});
