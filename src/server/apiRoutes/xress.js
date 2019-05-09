import express from 'express';
import { resolve } from 'path';

export default class Xpress {
  constructor(config) {
    this.app = express()
    const port = config.portWebApi;

    this.app.use('/', express.static(resolve(__dirname, 'public')));
    this.app.listen(port, () => console.log(`WebApp + RESTAPI listening on port ${port}!`.green));
  }
}
