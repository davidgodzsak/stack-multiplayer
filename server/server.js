var express = require('express');
var http = require('http');
var socketio = require('socket.io');

var app = express();
var server = http.createServer(app);
var io = socketio.listen(server);

function randomString() {
  return Date.now().toString();
}

var numberOfPlayersInActiveRoom = 0;
var actGame = randomString();
var game = {};

console.log(game);

io.on('connection', function (socket) {
  console.log(socket.id,' connects');
  socket.on('JOIN_REQUEST', function (status) {
    console.log('joined', socket.id);
    var gameId = actGame;
    var playerId = randomString();
    socket.join(gameId);

    if(numberOfPlayersInActiveRoom==0){
      game = status;
      game.player.myId=0;
    } else {
      game.player.myId=1;
    }

    socket.emit('JOIN_ACCEPTED', game);

    numberOfPlayersInActiveRoom++;
    if (numberOfPlayersInActiveRoom === 2) {
      io.to(gameId).emit('START_GAME');
      actGame = randomString();
      numberOfPlayersInActiveRoom = 0;
      game = {};
    }
  });
});

console.log('Server listening on port 3001');

server.listen(3001);
