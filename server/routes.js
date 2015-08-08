
module.exports = function(app) {

	app.get('/', function(req, res){
		res.render('index');
	});
	app.get('*', function(req, res){
		res.send('404');
	});
	app.post('/sendMessage', function(req, res){
		var command = (parseInt(req.body.machine)+1)+'/5/'+map(req.body.segments);
		app.sendToArduino(command);
	});
	var segments = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r'];
	var map = function(ints){
		var str = '';
		if (ints) for (var i = ints.length - 1; i >= 0; i--) str += segments[ints[i]]; 
		return str;
	}
};