# Install to ADB

> Installing apps to Firefox OS devices connected via USB+ADB

## Installation

`
npm install git+https://github.com/sole/install-to-adb.git
`

Or clone the repository and then run `npm install` on its folder, if you just want to run the demo.

## Usage

```javascript
var installToADB = require('install-to-adb');

installToADB(appPath) // returns a promise, results are all the apps installed on all the devices
```

## Demo

The code in demo.js shows how to call this module to install a sample app in all ADB connected devices and then launch it too!

We use promises, hence the usage of `then` instead of a callback.

```javascript
var path = require('path');
var installToADB = require('./');
var appPath = path.join(__dirname, 'node_modules', 'sample-packaged-app');

installToADB(appPath).then(function(result) {
	console.log('result', result);
	process.exit(0);
});
```


## Making your life easier

### Disable the prompt that asks for permission each time a connection is done

This will allow you to run the script even with the screen turned off--otherwise the script will be 'suspended' waiting for you to accept the incoming connection, and if the screen is turned off you will never see that!

In WebIDE Device Preferences search for `devtools.debugger.prompt-connection` and uncheck the checkbox
