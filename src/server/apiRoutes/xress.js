const express = require('express')
const path = require('path');
export default class Xpress{
    constructor(config) {

      this.app = express()
      const port = config.portWebApi;

      this.app.use("/", express.static(path.resolve(__dirname, 'public')));
      this.app.listen(port, () => console.log(` \x1b[32m WebApp + RESTAPI listening on port ${port}! \x1b[0m`))
    }
}