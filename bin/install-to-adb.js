#!/usr/bin/env node

var fs = require('fs');
var installToADB = require('../');
var appPath = process.argv[ process.argv.length - 1 ];

try {
	appPath = fs.realpathSync(appPath);
} catch(e) {
	console.error(e.message);
	return;
}

console.log(appPath);
installToADB(appPath).then(function(res) {
	console.log('installed', res);
	process.exit(0);
});


