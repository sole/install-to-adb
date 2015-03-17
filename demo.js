var path = require('path');
var installToADB = require('./');
var appPath = path.join(__dirname, 'node_modules', 'sample-packaged-app');

installToADB(appPath).then(function(result) {
	console.log('result', result);
	process.exit(0);
});
