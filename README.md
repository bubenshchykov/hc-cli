hipchat cli
==

```javascript
npm install hc-cli -g
hip init <authtoken>      // hipchat authtoken from your settings
```

![!alt tag](http://s13.postimg.org/glysi4wzr/Screen_Shot_2014_04_06_at_12_04_10_AM.png)


```javascript
hip ping <user> <message> // sent a private message
hip chat <room>           // join the chat room
```

And of course you can get directly to [Mathias](https://github.com/mafintosh)
```javascript
hip pingm <message>
```

why?
==
Hipchat becomes popular but skype guys like me don't want to keep two messangers open. A small terminal chat on demand is the only compromise to quickly reach hipchat folks when needed.

And that's a draft version done for CPH hackaton #5

next
==
* lookup users or rooms on tabbing
* improve terminal UI, maybe with having it as a static sticky chat showing last 10 messages
* features to share terminal logs:
```javascript
hip snap <user-or-room> // sends a snapshot of terminal logs to the user or room
hip snap <user-or-room> --s // lets u scroll to some terminal logs and snap it to the user / room by pressing "S"
```
* hipchat v.2 guys are implementing api for querying private messages history, so it will be possible to make a private chat hopefully soon


