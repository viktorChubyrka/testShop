const { Client } = require("pg");
const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "TestDatabase",
  password: "postgres",
  port: 1234,
});
client.connect();

client.query("SELECT * FROM Students", (err, res) => {
  console.log(err, res);
  client.end();
});

module.exports = client;
