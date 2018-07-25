var socket = io.connect('http:localhost:3000');


var playerName;
var roomID;
var playerTurn = false;


//sets game playable
var setPlayable = function( bool){
    $('#defect').attr('disabled', !bool);
    $('#continue').attr('disabled', !bool);
};

//defect
var defect = function(){
    socket.emit('play', {name:playerName, defect:true});
}

//continue
var cont = function(){
    socket.emit('play', {name:playerName, defect:false});
}

//gameEnd
var gameEnd = function( bool){
    //gameEnd
}



//socket on methods

//initialize game as p1
socket.on('startP1', function(data){
    playerName = data.name;
    roomID = data.roomID;
    playerTurn = true;
});

//initialize game as p2
socket.on('startp2', function(data){
    playerName = data.name;
    roomID = data.roomID;
    playerTurn = false;
    setPlayable(true);
});

//make game playable
socket.on('gameStart', function(data){
    setPlayable(data);
});

//enemy plays turn
socket('play', function(data){
    if(data){
        setPlayable(true);
    }
    else{
        gameEnd(false);
    }
});