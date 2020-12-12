const { Router } = require('express');
const morgan = require('morgan');

// routes
const api = require('./api');

const routes = () => {
  const router = new Router();

  router.use(morgan('dev'));

  router.use('/api', api());

  return router;
};

module.exports = routes;
