import express from 'express';
import { resolve } from 'path';
import ip from 'ip';

export default class Xpress {
  constructor(config) {
    this.app = express()
    const port = config.portWebApi;

    this.app.use('/', express.static(resolve(__dirname, 'public')));
    this.app.listen(port, () => console.log(`
    -------------------------------------------
    Dashboard and controlls can be found on:
    ${ip.address()}:${port}/adminDash.html
    localhost:${port}/adminDash.html

    The game can be found on:
    ${ip.address()}:${port}/game/
    localhost:${port}/game/

    The scoreboard can be found on:
    ${ip.address()}:${port}/
    localhost:${port}/
    All data is saved in the root of the project! highscores-DateEpoch.json`.cyan));
  }
}
