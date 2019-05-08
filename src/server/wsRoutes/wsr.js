const WebSocket = require('ws');

export default class WebS {
  constructor(config) {
    this.wss = new WebSocket.Server({ port: config.portSockets });
    this.events = {};

    this.wss.on('connection', ws => {
      ws.on('message', message => {
        console.log(`Received message => ${message}`);
        try {
          const msg = JSON.parse(message);
          this.events[msg.eventName](msg, ws);
        } catch(e) {
          console.log('There is a stupid who isn\'t sending json data!!!'.bgRed.white);
        }
      });
    });
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
