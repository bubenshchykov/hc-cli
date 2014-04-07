var request = require('request');
var EventEmitter = require('events').EventEmitter;
var apiRoot = 'https://api.hipchat.com/v2/';

module.exports = function(authtoken) {

	function validate(cb) {
		return request.get({
			url: auth('room'),
			json: true
		}, function(err, res) {
			if(err || res.statusCode !== 200) {
				err = err || {error: res.body};
				return cb(err);
			}
			return cb(false);
		});
	}

	function message(userId, message, cb) {
		return request.post({
			url: auth('user/' + userId + '/message'),
			json: {message: message}
		}, function (err, res) {
			if (err || res.statusCode !== 204) {
				err = err || {error: res.body};
				return cb(err);
			};
			return cb();
		});
	}

	function chat(roomId, message, cb) {
		return request.post({
			url: auth('room/' + roomId + '/notification'),
			json: {
				message: message,
				notify: true
			}
		}, function (err, res) {
			if (err || res.statusCode !== 204) {
				err || (err = res.body || {code: res.statusCode});
				return cb(err);
			};
			return cb();
		});
	}

	/* webhooks establishing enabled only for admin roles,
       so we have to pull the messages instead */
	function history(roomId) {
		var shownIds = [];
		var ev = new EventEmitter();
		poll(0);

		return ev;

		function poll(wait) {
			setTimeout(function(){
				request.get({
					url: auth('room/' + roomId + '/history'),
					json: true
				}, function (err, res) {
					if (err || res.statusCode !== 200) {
						err = res.body;
						return ev.emit('error', err);
					}
					if (res.body.items) {
						var messages = res.body.items.slice(-10);
						messages.forEach(function(message){
							if (shownIds.indexOf(message.id) === -1) {
								shownIds.push(message.id);
								ev.emit('message', message);
							}
						});
					}
					/* api rate limit is 100 reqs / 300 sec
					   in 5 min u can send 40 messages and have 60 history polling reqs with 5-sec frequency */
					return poll(5000);
				});
			}, wait);
		}

		return ev;
		
	}

	function auth(url) {
		return apiRoot + url + '?auth_token=' + authtoken;
	}

	return {
		validate: validate,
		message: message,
		chat: chat,
		history: history
	}	
} 