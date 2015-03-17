'use strict';

/* global require */
/* global module */

var path = require('path');
var fs = require('fs');
var Promise = require('es6-promise').Promise;
var findApp = require('node-firefox-find-app');
var installApp = require('node-firefox-install-app');
var uninstallApp = require('node-firefox-uninstall-app');

module.exports = pushApp;

function pushApp(client, appPath) {
  var manifestPath = path.join(appPath, 'manifest.webapp');
  var manifest = loadJSON(manifestPath);
  
  return findApp({
    client: client,
    manifest: manifest
  }).then(function(apps) {
    return uninstallApps(client, apps);
  }).then(function() {
    return installApp({
      client: client,
      appPath: appPath
    });
  }).then(function() {
    return findApp({
      client: client,
      manifest: manifest
    }).then(function(apps) {
      return apps[0];
    });
  });

}

function uninstallApps(client, apps) {
  return Promise.all(apps.map(function(app) {
    return uninstallApp({
      client: client,
      manifestURL: app.manifestURL
    });
  }));
}

function loadJSON(path) {
  var data = fs.readFileSync(path, 'utf8');
  return JSON.parse(data);
}
