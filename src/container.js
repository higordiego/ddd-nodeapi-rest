const { createContainer, Lifetime, asClass, asValue } = require('awilix');
const { scopePerRequest } = require('awilix-express');


const config = require('./../config');
const models = require('./infra/models');
const Server = require('./interfaces/http/server');


const container = createContainer();

// Register manually
container.register({
  config: asValue(config),
  models: asValue(models),

  server: asClass(Server).singleton(),
});

// Dynamically register app, infra components
container.loadModules(
  [
    'app/**/*.js',
    'infra/authentication/*.js',
    'infra/encryption/*.js',
    'infra/repositories/*!(BaseRepository).js',
  ],
  {
    formatName: 'camelCase',
    resolverOptions: {
      lifetime: Lifetime.SINGLETON,
    },
    cwd: __dirname,
  }
);

// Middleware
container.register({
  containerMiddleware: asValue(scopePerRequest(container)),
});

// console.log(container.registrations);

module.exports = container;
