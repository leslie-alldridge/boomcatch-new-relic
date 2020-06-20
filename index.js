var path = require('path');
var boomcatch = require('boomcatch');

boomcatch.listen({
	host: 'localhost',
	port: 8888,
	maxSize: 1048576,
	log: console,
  workers: require('os').cpus().length,
  mapper: path.resolve('./mapper.js'), // Preps data structure
  forwarder: path.resolve('./forwarder.js'), // Sends data to New Relic
  delayRespawn: 0,
  maxRespawn: -1
});