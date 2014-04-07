var Datastore = require('nedb');
var homedir = require('userhome');
var db = new Datastore({
	filename: homedir('.hc-cli.db'),
	autoload: true
});

exports.saveAuthtoken = function(authtoken, callback) {
	db.update({}, {authtoken: authtoken}, {upsert: true}, callback);
}

exports.getAuthtoken = function (callback) {
	db.findOne({}, callback);
};