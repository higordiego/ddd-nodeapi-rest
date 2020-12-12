require('dotenv').config();

const fs = require('fs');
const path = require('path');
const env = require('./env');

const loadDatabaseConfig = () => {
  if (fs.existsSync(path.join(__dirname, './database.js'))) return require('./database')[ENV];

  throw new Error('Database configuration is required.');
};

const ENV = env(process.env.NODE_ENV || 'development');

const dbConfig = loadDatabaseConfig();


const config = {
  env: ENV,
  db: dbConfig,
  jwt: {
    secret: process.env.APP_KEY,
    ttl: process.env.APP_JWT_TTL,
  },
  debug: process.env.APP_DEBUG === 'true' ? true : false,
  port: process.env.APP_PORT,
};

module.exports = config;
