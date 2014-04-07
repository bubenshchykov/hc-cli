var db = require('../common/db');
var api = require('../common/api')

module.exports = function(user, message) {
	if (typeof message !== 'string') {
		message = user;
		user = 'mathiasbuus@gmail.com';
	}
	db.getAuthtoken(function(err, data){
		api(data.authtoken).message(user, message, function(err){
			if (err) {
				console.log('oops!'.red, JSON.stringify(err, undefined, 2).red);
			} else {
				console.log('sent!'.green);
			}
			return process.exit(-1);
		});
	});
}