var path = require('path');
var installToADB = require('./');
var launchApp = require('node-firefox-launch-app');
var appPath = path.join(__dirname, 'node_modules', 'sample-packaged-app');
var Promise = require('es6-promise').Promise;

installToADB(appPath).then(function(result) {
	console.log('result', result);

	Promise.all(result.map(function(res) {
		return launchApp({
			manifestURL: res.app.manifestURL,
			client: res.client
		});
	})).then(function() {
		process.exit(0);
	});

});
