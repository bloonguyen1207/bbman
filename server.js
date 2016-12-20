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

app.get('/about', function(req, res) {
  res.render('about');
})

app.get('/howtoplay', function(req, res) {
  res.render('tutorial');
});

app.get('/cool', function(req, res) {
  res.send(cool());
});

http.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

// Web Socket
var serverState = {
    isInGame: false,
    numPlayer: io.engine.clientsCount,
    clientsState: [],
    clientsReady: [],
    isSetMap: false,
    mapValue: 0
};

var clients = [];

io.on('connection', function(socket) {
  console.log('a user connected with id: ' + socket.id);

    var initClient = function () {
        serverState.numPlayer = io.engine.clientsCount; // update numPlayer
        clients.push(socket.id); // track index
        serverState.clientsState.push("menu"); // check all ready to get in game play
        serverState.clientsReady.push("");

        socket.broadcast.emit('updateServerState', serverState);
    };

    var updateHost = function (clientIndex) {
        if (serverState.clientsState[clientIndex] == "map") {
            serverState.isSetMap = false;
        } else if (serverState.clientsState[clientIndex] == "room") {
            var nextIndex = -1;
            serverState.clientsState.forEach(function (clientState, index) {
                if (clientState == 'room' && index != clientIndex) {
                    nextIndex = index;
                }
            });
            if (nextIndex != -1) {
                serverState.clientsReady[nextIndex] = "Host";
            } else {
                serverState.isSetMap = false;
                serverState.mapValue = 0;
            }
        }
    };

    var removeClient = function () {
        var clientIndex = clients.indexOf(socket.id);
        if (serverState.clientsReady[clientIndex] == "Host") {
            updateHost(clientIndex);
        }
        serverState.clientsState.splice(clientIndex, 1); // remove player serverState
        serverState.clientsReady.splice(clientIndex, 1);
        clients.splice(clientIndex, 1); // remove player

        socket.broadcast.emit('updateServerState', serverState);
        console.log("removeClient");

        serverState.numPlayer = io.engine.clientsCount; // update numPlayer
    };

    var resetServer = function () {
        if (io.engine.clientsCount == 0) {
            serverState.isInGame = false;
            serverState.isSetMap = false;
            serverState.mapValue = 0;
        }
    };

    initClient();

  // User disconnected
  socket.on('disconnect', function(){
    console.log('user disconnected');
    console.log(io.engine.clientsCount);

    //remove client
      removeClient();

      //auto reset if there is no player left
      resetServer();
  });

    socket.on('checkServerState', function () {
        // console.log("return serverState");
        // console.log(serverState.isSetMap);
        socket.emit('returnServerState', serverState);
    });

    socket.on('setClientState', function (clientState) {
        serverState.clientsState[clients.indexOf(socket.id)] = clientState;
        socket.broadcast.emit('updateServerState', serverState);
    });

    socket.on('setIsSetMap', function (isSetMap) {
        serverState.isSetMap = isSetMap;
        // console.log(serverState.isSetMap);
        socket.broadcast.emit('updateServerState', serverState);
  });

    socket.on('setMapValue', function (mapValue) {
        serverState.mapValue = mapValue;
        serverState.clientsReady[clients.indexOf(socket.id)] = "Host";
        // console.log(serverState.mapValue);
        socket.broadcast.emit('updateServerState', serverState);
    });

    socket.on('setClientReady', function (clientReady) {
        serverState.clientsReady[clients.indexOf(socket.id)] = clientReady;
        io.sockets.emit('updateServerState', serverState);
    });

    socket.on('getClientIndex', function () {
        socket.emit('returnClientIndex', clients.indexOf(socket.id));
  });

  socket.on('setInGame', function(inGame) {
    serverState.isInGame = inGame;
    console.log("set In game: ");
    console.log(serverState.isInGame);
  });

    socket.on('resetGame', function () {
        serverState.isInGame = false;
        serverState.mapValue = 0;
        serverState.isSetMap = false;
        serverState.clientsReady.forEach(function (clientReady, index) {
            serverState.clientsReady[index] = "";
        });
        socket.broadcast.emit('updateServerState', serverState);
  });
  // Create room
 //  socket.on('create', function(room) {
	//   socket.join(room);
	// });
  // console.log(io.sockets.clients());
  // console.log(io.engine.clientsCount);
});


