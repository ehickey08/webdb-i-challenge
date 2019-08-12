const knex = require('knex');

const config = require('../knexfile.js');

const DBEnvironment = process.env.DB_ENV || 'development'

module.exports = knex(config[DBEnvironment]);