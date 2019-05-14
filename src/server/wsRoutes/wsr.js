const WebSocket = require('ws')

const heartbeat = function() {
  this.isAlive = true;
}

const noop =function() {};
export default class WebS {
  constructor(config) {
    this.wss = new WebSocket.Server({ port: config.portSockets });
    this.events = {};

    this.wss.on('connection', ws => {
      ws.isAlive = true;
      ws.on('pong', heartbeat);
      
      ws.on('message', message => {
        try {
          const msg = JSON.parse(message);
          if (typeof this.events[msg.eventName] === 'function') {
            this.events[msg.eventName](msg, ws);
          }
        } catch(e) {
          console.log('There is a stupid who isn\'t sending json data!!!'.bgRed.white);
        }
      });
    });

    this.interval = setInterval(e => {
      this.wss.clients.forEach(function each(ws) {
        if (ws.isAlive === false) return ws.terminate();
     
        ws.isAlive = false;
        ws.ping(noop);
      });
    }, 30000);

    console.log(`WebSockets are listening to ${config.portSockets}`.green);
  }

  broadCastToClients(data) {
    this.wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  }

  onEvent(name, cb) {
    this.events[name] = cb;
  }
}
