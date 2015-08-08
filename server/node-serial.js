
var os = require('os');
var serialPort = require("serialport");

module.exports = function(app) {
	// console.log(os.arch());
	// console.log(os.platform());
	var arduino;
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
			arduino = new serialPort.SerialPort(comName, {
				baudrate: 19200,
				parser: serialPort.parsers.readline('\n')
			});
			arduino.on('open', function () {
				console.log('successfully connected to', comName);
				arduino.on('data', function(data) {
					console.log('data received: ' + data);
				});
//				setTimeout(app.sendToArduino, 5000, '1/6/hijklm\n');
			});
		}	else{
			console.log('Arduino Not Connected');
		}
		
	});
	
	app.sendToArduino = function(data){
		if (arduino == undefined){
			console.log('Arduino Not Connected');
		}	else{
			console.log('sending to arduino ::', data);
			arduino.write(data, function(e, results) {
				if (e) console.log('errors: ', e);
			});
			console.log('---------------------------');
		}
	}
};
