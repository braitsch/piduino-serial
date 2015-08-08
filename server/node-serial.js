
var os = require('os');
var serialPort = require("serialport");

module.exports = function() {
	// console.log(os.arch());
	// console.log(os.platform());
	var connection;
	serialPort.list(function (e, ports) {
		
		var comName;
		ports.forEach(function(port) {
		// osx //
			if (os.platform() == 'darwin' && port.manufacturer == 'Arduino (www.arduino.cc)'){
				comName = port.comName;
		// raspberry pi //
			}	else if (os.platform() == 'linux' && port.manufacturer == 'Arduino__www.arduino.cc_'){
				comName = port.comName;
			}
		});
		
		if (comName){
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
		}	else{
			console.log('Arduino Not Connected');
		}
		
	});
	
	var sendToArduino = function(data){
		console.log('sending to arduino ::', data);
		connection.write(data, function(e, results) {
			if (e) console.log('errors: ', e);
		});
	}
};
