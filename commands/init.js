require('colors');

var api = require('../common/api');
var db = require('../common/db');

module.exports = function(authtoken) {
	api(authtoken).validate(function(err){
		if (err) {
			return console.log(
				'invalid authtoken, please get a fresh one from account settings page'.red,
				'\nsee https://<domain>.hipchat.com/account/api'.red);
		}
		console.log('good!'.green);
		return db.saveAuthtoken(authtoken);
	});
}