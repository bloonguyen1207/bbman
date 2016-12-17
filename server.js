var cool = require('cool-ascii-faces');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('port', (process.env.PORT || 2222));

app.use(express.static(__dirname));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
	res.render('index');
});

app.get('/cool', function(req, res) {
  res.send(cool());
});

http.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

// Web Socket
var state = {
  inGame: false,
  num_player: io.engine.clientsCount,
  clientState: [],
  isSetMap: false
};

var clients = [];

io.on('connection', function(socket) {
  console.log('a user connected with id: ' + socket.id);

  state.num_player = io.engine.clientsCount;
  clients.push(socket.id);
  state.clientState.push("menu");

  // console.log("server file state:");
  // console.log(state.inGame);

  // User disconnected
  socket.on('disconnect', function(){
    console.log('user disconnected');
    console.log(io.engine.clientsCount);

    //remove client
    state.clientState.splice(clients.indexOf(socket.id), 1);
    clients.splice(clients.indexOf(socket.id), 1);

    state.num_player = io.engine.clientsCount;

    //reset
    if (io.engine.clientsCount == 0) {
      state.inGame = false;
      state.isSetMap = false;
    }

  });

  socket.on('New player', function (data) {
    io.emit('players', { num_player: io.engine.clientsCount });
    console.log(data);
  });

  socket.on('setInGame', function(inGame) {
    state.inGame = inGame;
    console.log("set In game: ");
    console.log(state.inGame);
  });

  socket.on('setMap', function(isSetMap) {
    state.isSetMap = isSetMap;
    console.log("set map, update State");
    io.emit('updateState', state);
    console.log(state.isSetMap);
  });

  socket.on('setMapOnly', function(isSetMap) {
    console.log("set Map only");
    state.isSetMap = isSetMap;
    console.log(state.isSetMap);
  });

  socket.on('upState', function(clientState) {
    // console.log("clientState on server file");
    // console.log(clientState);
    state.clientState[clients.indexOf(socket.id)] = clientState;
  });

  socket.on('checkState', function() {
    console.log("return state");
    console.log(state.isSetMap);
    io.emit('returnState', state);
  });

  // Create room
 //  socket.on('create', function(room) {
	//   socket.join(room);
	// });
  // console.log(io.sockets.clients());
  // console.log(io.engine.clientsCount);
});


