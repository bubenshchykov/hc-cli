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
	.command('chat <room>')
	.description('chat in room with Mathias')
	.action(commands.chat);

program
	.command('pingm <message>')
	.description('ping Mathias with a message')
	.action(commands.ping);

program.parse(process.argv);