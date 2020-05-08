var { Pool } = require("pg");

// const dotenv = require("dotenv");
// dotenv.config();

// const databaseConfig = { connectionString: process.env.DATABASE_URL };

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Shop",
  password: "postgres",
  port: 1234,
});

module.exports = pool;
