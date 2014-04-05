#!/usr/bin/env node

var program = require('commander');
var commands = require('../commands');

program
	.command('init <authoken>')
	.description('init the hm with hipchat authoken')
	.action(commands.init);

program
	.command('ping <user> <message>')
	.description('ping user with a message')
	.action(commands.ping);

program
	.command('pingm <message>')
	.description('ping Mathias with a message')
	.action(commands.ping);

program
	.command('alias <user> <char>')
	.description('alias a user with some char to ping eg Allan by "pinga <message>"')
	.action();

program
	.command('chat <room>')
	.description('chat in room with Mathias')
	.action(commands.chat);

program.parse(process.argv);