var cool = require('cool-ascii-faces');
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 2222));

app.use(express.static(__dirname));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
	// res.writeHead(200, {'Content-Type': 'text/html'});
	// res.end('<h1>Hello World</h1>');
	res.render('index');
});

app.get('/cool', function(req, res) {
  res.send(cool());
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
