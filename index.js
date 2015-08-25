
function leanLogger(options){
	if(!options)
		options = {};

	this.debug = true;

	return this;
}

leanLogger.prototype.log = function log(req, res, next){
	var self 	= this;
	var start 	= +new Date();
	var stream 	= process.stdout;

	// Constructing request params
	var reqParams = {
		'url' 			: req.url,
		'method' 		: req.method,
		'app'			: req.app,
		'baseUrl'		: req.baseUrl,
		'body'			: req.body,
		'cookies'		: req.cookies,
		'hostname'		: req.hostname,
		'ip'			: req.ip,
		'ips'			: req.ips,
		'originalUrl'	: req.originalUrl,
		'params'	 	: req.params,
		'path'		 	: req.path,
		'protocol'	 	: req.protocol,
		'query'			: req.query,
		'route'			: req.route,
		'secure'		: req.secure,
		'signedCookies'	: req.signedCookies,
		'stale'			: req.stale,
		'subdomains'	: req.subdomains,
		'xhr'			: req.xhr
	};

	res.on('finish', function(){
		var duration 	= +new Date() - start;
		var message 	= reqParams.method + ' to ' + reqParams.url + ' \ntook ' + duration + ' ms \n\n';

		if(self.debug)
			stream.wrtie(reqParams);
		
		// prints the log message
		stream.write(message);
	});

	next();
}

module.exports = leanLogger;