var request = require('request');
var EventEmitter = require('events').EventEmitter;
var apiRoot = 'https://api.hipchat.com/v2/';

module.exports = function(authtoken) {

	function message(userId, message, cb) {
		return request.post({
			url: auth('user/' + userId + '/message'),
			json: {message: message}
		}, cb);
	}

	function chat(roomId, message, cb) {
		return request.post({
			url: auth('room/' + roomId + '/notification'),
			json: {
				message: message,
				notify: true
			}
		}, cb);
	}

	/* webhooks establishing enabled only for admin roles,
       so we have to pull the messages instead */
	function history(roomId) {
		var ids = [];
		var ev = new EventEmitter();
		poll();
		return ev;

		function poll(wait) {
			setTimeout(function(){
				request.get({
					url: auth('room/' + roomId + '/history'),
					json: true
				}, function (err, res) {
					if (err) {
						return ev.emit('error', err);
					}
					if (res.body.items) {
						var messages = res.body.items.slice(-10);
						messages.forEach(function(message){
							if (ids.indexOf(message.id) === -1) {
								ids.push(message.id);
								ev.emit('message', message);
							}
						});
					}
					return poll();
				});
			}, 2000);
		}

		return ev;
		
	}

	function auth(url) {
		return apiRoot + url + '?auth_token=' + authtoken;
	}

	return {
		message: message,
		chat: chat,
		history: history
	}	
} 