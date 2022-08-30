require('dotenv').config()

module.exports = {
  // Key codes
  database: {
    connectionLimit : 100000,
    connectTimeout  : 60 * 60 * 1000,
    acquireTimeout  : 60 * 60 * 1000,
    timeout         : 60 * 60 * 1000,
    host: "us-cdbr-east-06.cleardb.net",
    user: "b17af9b645ea35",
    password: "e77fac0c",
    database: "heroku_ba1c1f8dbae87c2",
  }
};