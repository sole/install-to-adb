# Install to ADB

> Installing apps to Firefox OS devices connected via USB+ADB

So far we've tested it with as much as 10 phones at the same time (connected via a USB hub). Of course they also work without a hub, but then you also have less devices to push to!

**Warning:** Both node 0.12 and io.js 1.51 give a `Segmentation fault 11` error. node 0.10 works fine.

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

## Command line tool

You can also use this as a command line tool! So you don't need to write any code, just point it to the path of the app you want to be installed in your adb-connected devices. You can also specify if you want the app to be launched once it has been installed. This is the syntax:

```bash
/path/to/install-to-adb.js /path/to/app --launch
```

The path to install-to-adb will be different depending on how you installed the module.

### Using locally

Suppose we installed the module in our node-based project `supertest` which is in `~/projects/supertest`. There will be an `install-to-adb` folder in the `node_modules` folder. So you can reference the binary, from anywhere, with this:

```bash
~/projects/supertest/node_modules/install-to-adb/bin/install-to-adb
```

Or, if you're in the project folder:

```bash
./node_modules/install-to-adb/bin/install-to-adb ...
```

### Installing globally

You can also install this utility globally:

```bash
npm install -g git+https://github.com/sole/install-to-adb.git
```

And then you can install apps without having to reference the full path to the utility:

```bash
install-to-adb /path/to/app --lauch
```


### Uninstalling globally

Cleaning up is important. This is how you would uninstall this module from your global path:

```bash
npm uninstall --g install-to-adb
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
