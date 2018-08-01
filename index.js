var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var room = 0;
io.on('connection', function(socket){

    console.log('a user connected');


    socket.on('create', function(data){
        socket.join( 'room-' + ++room);
        socket.emit('openGame1', {name: data.name, room: 'room-' + room});
        console.log('opened game player=' + data.name);
    });
    

    socket.on('join', function(data){
        var room = io.nsps['/'].adapter.rooms[data.room];
      if( room && room.length == 1){
        socket.join(data.room);
        socket.emit('openGame2', {name: data.name, room: data.room })
        console.log('joined game player=' + data.name);
      }
      else {
        socket.emit('err', {message: 'Sorry, The room is full!'});
      }
      
    });

    socket.on('gameEnd',function(data){
        io.sockets.in(data.room).emit('gameEnd',{name: data.name});
        console.log('game end player ' + data.name + ' win');
    });

    socket.on('continue',function(data){
        socket.broadcast.to(data.room).emit('play', {name:data.name});
        console.log(data.name+ ' continue');
    });

})

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});
  
  server.listen(3000, function(){
    console.log('listening on *:3000');
});