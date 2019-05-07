const WebSocket = require('ws')

export default class WebS{
    constructor(config) {
      this.wss = new WebSocket.Server({ port: config.portSockets })
      this.events = {};
      
      this.wss.on('connection', ws => {
        ws.on('message', message => {
          try {
            message = JSON.parse(message);
            this.events[message.eventName](message, ws);
          } catch {
            console.log('Warning got a message that was not a json')
          }
        })
      })
      console.log(` \x1b[32m WebSockets are listening to ${config.portSockets} \x1b[0m`)
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