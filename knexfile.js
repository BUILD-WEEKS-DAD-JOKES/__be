require('dotenv').config()
module.exports = {

  development: {
    client: 'pg',
    connection: {
      database:'dadjokes',
      user:'postgres',
      password:'Neverzero124'
    },
      pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  },
  testing: {
    client: 'pg',
    connection: {
      database:'dadjokes-testing',
      user:'postgres',
      password:'Neverzero124'
    },
      pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  },

  

};
