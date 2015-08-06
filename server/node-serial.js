
//var os = require('os');
var serialPort = require("serialport");

module.exports = function() {
	// console.log(os.platform());
	// console.log(os.hostname());
	// console.log(os.type());
	// console.log(os.arch());
	var connection;
	serialPort.list(function (e, ports) {
		
		var comName;
		ports.forEach(function(port) {
			console.log(port.manufacturer, port.comName, port.manufacturer=='Arduino (www.arduino.cc)');
			if (port.manufacturer == 'Arduino (www.arduino.cc)') comName = port.comName;
		});
		
		connection = new serialPort.SerialPort(comName, {
			baudrate: 19200,
			parser: serialPort.parsers.readline('\n')
		});

		connection.on('open', function () {
			console.log('successfully connected to', comName);
			connection.on('data', function(data) {
				console.log('data received: ' + data);
			});
			setTimeout(sendToArduino, 5000, '1/6/hijklm\n');
		});
	});
	
	var sendToArduino = function(data){
		console.log('sending to arduino ::', data);
		connection.write(data, function(e, results) {
			if (e) console.log('errors: ', e);
		});
	}
};