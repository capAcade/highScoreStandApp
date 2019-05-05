# webSocket Routes

Here are all the files for the websockets.

## wsr.js

The wsr.js is a small websocket handler where you can talk to your clients in private or broadcast information. They are able to send information in the way of events. All data should go trough json. As that is what the wsr.js is compiling it to

### init wsr

example code for initializing wsr.js

```javascript
import WebS from './wsRoutes/wsr'
const config = {
    portSockets: 8081
}
const wsApp = new WebS(config);
```

### Add event listner

example code for eventlistner. This will be called everytime the client sends a websocket message. With the corresponding event name.

```javascript
wsApp.onEvent('exampleEvent', (data) =>{
    console.log('invoked event', data)
});
```

On the front end the code will look like this:

```javascript
const url = 'ws://localhost:8081/scoreBroadcast'
const connection = new WebSocket(url)

connection.send('{"eventName": "exampleEvent", "ninjaName": "Silent Bash"');
```

## broadcast to clients

example code how to broadcast to all clients:

```javascript
import WebS from './wsRoutes/wsr'
const config = {
    portSockets: 8081
}
const wsApp = new WebS(config);

//Actual broadcasting happens here
wsApp.broadCastToClients({data: 'stuff'});
```
