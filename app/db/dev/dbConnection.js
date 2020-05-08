var pool = require("./pool");

pool.on("connect", () => {
  console.log("connected to the db");
});

const createUsersTable = () => {
  const usersCreateQuery = `CREATE TABLE IF NOT EXISTS users
  (id SERIAL PRIMARY KEY, 
  email VARCHAR(100) UNIQUE NOT NULL, 
  first_name VARCHAR(100), 
  last_name VARCHAR(100), 
  password VARCHAR(100) NOT NULL,
  created_on DATE NOT NULL)`;

  pool
    .query(usersCreateQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const createProductTable = () => {
  const productCreateQuery = `CREATE TABLE IF NOT EXISTS product
    (id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    discription VARCHAR(300) NOT NULL,
    cost integer NOT NULL,
    created_on DATE NOT NULL)`;

  pool
    .query(productCreateQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const createBagTable = () => {
  const bagCreateQuery = `CREATE TABLE IF NOT EXISTS bag
    (id SERIAL PRIMARY KEY, 
    userId INTEGER REFERENCES users(id) ON DELETE CASCADE,
    products integer [],
    created_on DATE NOT NULL)`;

  pool
    .query(bagCreateQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const dropUsersTable = () => {
  const usersDropQuery = "DROP TABLE IF EXISTS users";
  pool
    .query(usersDropQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const dropProductTable = () => {
  const productDropQuery = "DROP TABLE IF EXISTS product";
  pool
    .query(productDropQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const dropBagTable = () => {
  const bagDropQuery = "DROP TABLE IF EXISTS bag";
  pool
    .query(bagDropQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const createAllTables = () => {
  createUsersTable();
  createProductTable();
  createBagTable();
};

const dropAllTables = () => {
  dropUsersTable();
  dropProductTable();
  dropBagTable();
};

pool.on("remove", () => {
  console.log("client removed");
  process.exit(0);
});

createAllTables();

module.exports = {
  createAllTables,
  dropAllTables,
};
