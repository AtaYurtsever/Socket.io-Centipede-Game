var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var fs = require('fs');

var room = 0;
var dataJson = {player1: undefined, player2: undefined, 
                player1Commit: undefined, player2Commit: undefined,
                finishingPlayer: undefined, finishTurn: 
                undefined, finishingBet: undefined, otherBet: undefined}
io.on('connection', function(socket){

    console.log('a user connected');

    /**creates new room and makes the user join it */
    socket.on('create', function(data){
        socket.join( 'room-' + ++room);
        socket.emit('openGame1', {name: data.name, room: 'room-' + room});
        console.log('opened game player=' + data.name);
        //dataJson.player1 = data.name;
    });
    
    /** adds user to given room */
    socket.on('join', function(data){
        var room = io.nsps['/'].adapter.rooms[data.room];
      if( room && room.length == 1){
        socket.join(data.room);
        socket.emit('openGame2', {name: data.name, room: data.room })
        console.log('joined game player=' + data.name);
        //dataJson.player2 = data.name;
      }
      else {
        socket.emit('err', {message: 'Sorry, The room is full!'});
      }
      
    });

    /**collects data when game ends and informs other user */
    socket.on('gameEnd',function(data){
        
        console.log('game end player ' + data.name + ' win');
        dataJson.finishingPlayer = data.name;
        dataJson.finishTurn = data.turn;
        dataJson.finishingBet = data.finishingBet;
        dataJson.otherBet = data.otherBet;
        dataJson.player1 = data.name;
        dataJson.player1Commit = data.commit;
        io.sockets.in(data.room).emit('gameEnd',{name: data.name});
        //console.log(dataJson);
        
    });

    socket.on('sendCred',function(data){
        console.log(data.json);
        
        dataJson.player2 = data.name;
        dataJson.player2Commit = data.commit;
        console.log('printing');
        result(dataJson);
    });

    /**informs other user if player chooses continue */
    socket.on('continue',function(data){
        socket.broadcast.to(data.room).emit('play', {name:data.name});
        console.log(data.name+ ' continue');
    });

    /**collects data of commits */
    socket.on('commit', function(data){
        console.log('player ' + data.name + ' commited ' + data.commit);
        if(data.name == dataJson.player1){
            dataJson.player1Commit = data.commit;
        }
        else{
            dataJson.player2Commit = data.commit;

        }
    })

})

/**
 * prints whole data json to results.csv
 * @param {json} arr 
 */
var result = function(arr){
    var message = '\n';
    for(i in arr){
        message= message + arr[i] + ',';
    }
    console.log(message);
    fs.appendFileSync('results.csv', message);
}

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});
  
  server.listen(80, '192.168.1.44', function(){
    console.log('listening on *:80');
});