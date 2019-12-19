const knex = require('knex')

const config = require('../knexfile')

const db = knex(config[process.env.DB_ENV || 'testing'])

module.exports = db