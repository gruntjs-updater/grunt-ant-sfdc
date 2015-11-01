'use strict';
var grunt = require('grunt');
var auth = module.exports = {};

auth.parseAuth = function(options, target) {
  if (options.sessionConfig) {
    parseAuthMavensMate(options);
  }
  if (options.useEnv) {
    parseAuthEnv(options);
  }
  validateAuth(options);
  if (options.user) {
    grunt.log.writeln('User -> ' + options.user.green);
  } else if (options.serverurl) {
    grunt.log.writeln('Server -> ' + options.serverurl.green);
  }

  function parseAuthMavensMate(options) {
    if (options.sessionConfig.accessToken && options.sessionConfig.instanceUrl) {
      options.sessionid = options.sessionConfig.accessToken;
      options.serverurl = options.sessionConfig.instanceUrl;
    }
  }

  function parseAuthEnv(options) {
    options.user = process.env.SFUSER || false;
    options.pass = process.env.SFPASS || false;
    options.token = process.env.SFTOKEN || false;
    options.sessionid = process.env.SFSESSIONID || false;
    options.serverurl = process.env.SFSERVERURL || false;
  }

  function validateAuth(options) {
    var un = options.user;
    var pw = options.pass;
    var tk = options.token;
    var sid = options.sessionid;
    var url = options.serverurl;
    if(tk) {pw += tk; options.pass = pw;}
    if(!un && !(sid && url)) { grunt.log.error('no username specified for ' + target); }
    if(!pw && !(sid && url)) { grunt.log.error('no password specified for ' + target); }
    if(!(sid && url) && !(un || pw)) {grunt.fail.warn('username/password error');}
  }
};