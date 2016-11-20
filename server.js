var cool = require('cool-ascii-faces');
var express = require('express');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var app = express();

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

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

// Web Socket
io.on('connection', function(socket){
  console.log('a user connected');
});
