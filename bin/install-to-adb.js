#!/usr/bin/env node

var fs = require('fs');
var nopt = require('nopt');
var Promise = require('es6-promise').Promise;
var installToADB = require('../');
var launchApp = require('node-firefox-launch-app');

var opts = nopt({
	launch: Boolean
});

var appPath = opts.argv.remain.join(' ');

try {
	appPath = fs.realpathSync(appPath);
} catch(e) {
	console.error(e.message);
	return;
}

console.log(appPath);
installToADB(appPath).then(function(res) {
	console.log('installed app');

	// We were also asked to launch the app
	if(opts.launch) {
		
		console.log('launching');
		
		var promises = res.map(function(r) {
			return launchApp({
				manifestURL: r.app.manifestURL,
				client: r.client
			});
		});
		
		return Promise.all(promises);

	} else {
		return Promise.resolve(res);
	}

}).then(function() {
	process.exit(0);
});


