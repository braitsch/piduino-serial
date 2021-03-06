/**
 * A simple express app to communicate with an Arduino over serial
 * Author : Stephen Braitsch
 * More Info : https://github.com/braitsch/piduino-serial.git
 */

var express = require('express');
var app = express();
var http = require('http').Server(app);
var bodyParser = require('body-parser');

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/server');
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('stylus').middleware({ src: __dirname + '/public' }));
app.use(express.static(__dirname + '/public'));

require('./server/routes')(app);
require('./server/node-serial')(app);

if (app.get('env') === 'development') {
	app.locals.pretty = true;
}

http.listen(app.get('port'), function(){
	console.log("Express server listening on port %d in %s mode", app.get('port'), app.settings.env);
});