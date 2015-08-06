module.exports = function(app) {

	app.get('/', function(req, res){
		res.send('it works!')
	});	
	// app.get('*', function(req, res){
	// 	res.render('404', { title: 'Page Not Found'});
	// });
	
};