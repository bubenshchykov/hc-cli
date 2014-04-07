require('colors');

var db = require('../common/db');
var Api = require('../common/api');
var readline = require('readline');
var beep = require('beepbeep');

module.exports = function(roomId) {
	console.log('joining the room..'.green);
	db.getAuthtoken(function(err, data){
		var api = Api(data.authtoken);
		var hub = api.history(roomId)
			.on('message', onMessage)
			.on('error', onError);

		var rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout,
			terminal: false
		});
		return rl.on('line', onCommand);

		function onMessage(data) {
			var from = data.from.name || data.from + ': ';
			console.log(from.yellow, data.message.blue);
			return beep([10, 10]);

		}

		function onError(err) {
			error(err);
			return process.exit(-1);
		}

		function onCommand(text) {
			if (text === 'exit') {
				return process.exit(-1);
			}
			return api.chat(roomId, text, function(err) {
				if (err) {
					error(err);
				}
			});
		}

		function error(err) {
			console.log('oops!'.red, JSON.stringify(err, undefined, 2).red);
		}
	});
}