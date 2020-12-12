const express = require('express');
const bodyParser = require('body-parser')

// Routes configuration
const routes = require('./routes');

class Server {
  constructor({ config, containerMiddleware }) {
    this.app = express();
    this.config = config;

    // Load up the container
    this.app.use(containerMiddleware);
  }

  /**
   * Boots up the server
   */
  start() {
    this._configure();

    // start the server
    return new Promise((resolve) => {
      const http = this.app.listen(this.config.port || 3000, () => {
        const { port } = http.address();

        console.log(`API Running at port: ${port}`);
      });
    });
  }

  /**
   * Server Configurations
   */
  _configure() {
    // remove the Powered by Express header
    this.app.disable('x-powered-by');
    this.app.use(bodyParser.urlencoded({ extended: true }))
    this.app.use(express.json({}))

    // load up the routes
    this.app.use(routes());

    // Handle invalid requests
    this.app.use((req, res) => {
      return res.status(404).json({ error: 'Not found' });
    });
  }


  _template() {

  }
}

module.exports = Server;
