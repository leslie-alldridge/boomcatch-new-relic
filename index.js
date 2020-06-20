var path = require('path');
var boomcatch = require('boomcatch');

boomcatch.listen({
	host: 'localhost',                  // Defaults to '0.0.0.0' (INADDR_ANY)
	port: 8888,                               // Defaults to 80 for HTTP or 443 for HTTPS                          // Defaults to '/beacon'
	// limit: 100,                               // Defaults to 0
	maxSize: 1048576,                         // Defaults to -1
	log: console,                             // Defaults to object with `info`, `warn` and `error` log functions.
	workers: require('os').cpus().length,     // Defaults to 0
	// validator: 'permissive',
  // filter: 'unfiltered',
  mapper: path.resolve('./mapper.js'),
  forwarder: path.resolve('./forwarder.js'),
  fwdMethod: 'POST',
  fwdUrl: 'localhost',
  fwdPort: 8125,
  delayRespawn: 0,
  maxRespawn: -1                       // Defaults to 'GET'
});