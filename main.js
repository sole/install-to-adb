var connect = require('node-firefox-connect');
var portfinder = require('portfinder');
var adb = require('adbkit');
var adbClient = adb.createClient();
var Promise = require('es6-promise').Promise;

portfinder.basePort = 9000;

adbClient.listDevices()
	.then(function(devices) {
		console.log('found', devices.length, 'devices');
		Promise.all(devices.map(forwardDevice))
			.then(function(forwarded) {
				console.log('forwarded:', forwarded);
				return Promise.all(forwarded.map(connectToDevice));
			})
			.then(function(connected) {
				console.log('yes? ->', connected);
				return Promise.all(connected.map(listApps));
			})
			.then(function(er) {
				console.log('running apps', er);
				process.exit(0);
			});
	});


function getPort() {
	return new Promise(function(yay, nay) {
		portfinder.getPort(function(err, port) {
			if(err) {
				nay(err);
			} else {
				yay(port);
			}
		});
	});
}

function forwardDevice(device) {
	return (getPort().then(function(port) {
		var localAddress = 'tcp:' + port;
		var remoteAddress = 'localfilesystem:/data/local/debugger-socket';
		return adbClient
			.forward(device.id, localAddress, remoteAddress)
			.then(function() {
				return {
					id: device.id,
					port: port,
					local: localAddress,
					remote: remoteAddress
				};
			});
	}));
}

function connectToDevice(options) {
	var port = options.port;
	console.log('connectToDevice', port);

	return connect(port)
		.then(function(client) {
			return {
				id: options.id,
				port: port,
				client: client
			};
		});
}

function listApps(options) {
	var client = options.client;
	console.log('list apps', options.port);
	return new Promise(function(okCb, errCb) {
		client.getWebapps(function(err, webapps) {
			if(err) {
				errCb(err);
			} else {
				webapps.listRunningApps(function(err, apps) {
					if(err) {
						errCb(err);
					} else {
						okCb(apps);
					}
				});
			}
		});
	});
}

