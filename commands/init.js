var db = require('../common/db');

module.exports = function(authtoken) {
	db.saveAuthtoken(authtoken);
}