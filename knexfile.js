module.exports = {

  development: {
    client: 'pg',
    connection: {
      database:process.env.DB_DATABASE,
      user:process.env.DB_USER,
      password:process.env.DB_PASSWORD
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
      database:process.env.DB_DATABASE,
      user:process.env.DB_USER,
      password:process.env.DB_PASSWORD
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
