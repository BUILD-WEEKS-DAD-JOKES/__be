require('dotenv').config()
module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      // database: process.env.DB_DATABASE,
      // user: process.env.DB_USER,
      // password: process.env.DB_PASSWORD
      filename:'./data/dj.db3'
    },
    pool: {
      min:2,
      max:10,
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done);
      }
    },
    useNullAsDefault:true,
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    },

  },
  testing: {
    client: 'sqlite3',
    connection: {
      filename: './data/test.db3',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done);
      }
    }
  }
};
