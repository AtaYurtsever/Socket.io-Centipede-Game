
            var socket= io.connect('http://localhost:3000');
        
            var playerName;
            var roomName;
            $('#game').hide();
            
        
            var disable = function(bool){
                $('#defect').attr('disabled', bool);
                $('#continue').attr('disabled', bool);
            }
            disable(true);

            $('#defect').click(function(){
                socket.emit('gameEnd',{name: playerName, room:roomName});
            });

            $('#continue').click(function(){
                socket.emit('continue', {name: playerName,room:roomName});
                disable(true);
            });


            socket.on('play',function(data){
                console.log('myturn!!!');
                disable(false);
            });


            socket.on('gameEnd', function(data){
                console.log('game end');
                if(playerName == data.name){
                    alert('you win');
                }
                else{
                    alert('you lose');
                }
                $('#game').hide();
            });
        
            socket.on('openGame1', function(data){
                $('#menu').hide();
                $('#game').show();
                playerName = data.name;
                roomName = data.room;
                disable(false);
                console.log(data.room);
            });

            socket.on('openGame2', function(data){
                $('#menu').hide();
                $('#game').show();
                disable(true);
                playerName = data.name;
                roomName = data.room;
                console.log(data.room);
            });

            socket.on('err', function(data){
                alert(data.message);
            });
        
            $('#new').on('click', function(){
                var name = $('#newName').val();
                if(!name){
                    alert('please enter name');
                    return;
                }
                console.log('newbuttonpress');
        
                socket.emit('create', {name: name});
            });
            
        
            $('#join').on('click', function(){
                var name = $('#nameJoin').val();
                var room = $('#room').val();
                console.log(name + '--' + room);
                if(!name || !room){
                    alert('enter name and room');
                    return;
                }
                console.log('joinbuttonpress');

                socket.emit('join', {name:name, room:room});
            });
        
