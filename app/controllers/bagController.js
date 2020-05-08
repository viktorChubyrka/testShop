var moment = require("moment");
var isEmpty = require("../helpers/validations");
var dbQuery = require("../db/dev/dbQuery");

var { errorMessage, successMessage, status } = require("../helpers/status");

const createBag = async (req, res) => {
  const { productId, userId } = req.body;
  const created_on = moment(new Date());

  const getBagQuery = `SELECT * FROM users WHERE email = $1`;
  const values = [userId];

  try {
    const { rows } = await dbQuery.query(getBagQuery, values);
    const dbResponse = rows[0];
    if (dbResponse) {
      addToBagQuery = `UPDATE bag SET products = $1 WHERE userId = $2;`;
      values = [[...dbResponse.products].push(productId), userId];
      const { rows } = await dbQuery.query(addToBagQuery, values);
      const dbResponse = rows[0];
      successMessage.data = dbResponse;
      return res.status(status.created).send(successMessage);
    }
    createBagQuery = `INSERT INTO bag(userId,products) VALUES($1, $2) returning *`;
    values = [userId, [productId]];
    rows = await dbQuery.query(createBagQuery, values);
    dbResponse = rows[0];
    successMessage.data = dbResponse;
    return res.status(status.created).send(successMessage);
  } catch (error) {
    errorMessage.error = "Unable to create bag";
    return res.status(status.error).send(errorMessage);
  }
};

const getUserBag = async (req, res) => {
  const userId = req.body;
  const getBagQuery = "SELECT * FROM bag WHERE userId = $1";
  values = [userId];
  try {
    const { rows } = await dbQuery.query(getBagQuery);
    const dbResponse = rows;
    if (!dbResponse[0]) {
      errorMessage.error = "There are no products";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = dbResponse;
    return res.status(status.success).send(successMessage);
  } catch (error) {
    errorMessage.error = "Operation was not successful";
    return res.status(status.error).send(errorMessage);
  }
};

// const filterTripByDestination = async (req, res) => {
//   const { destination } = req.query;

//   const findTripQuery =
//     "SELECT * FROM trip WHERE destination=$1 ORDER BY id DESC";
//   try {
//     const { rows } = await dbQuery.query(findTripQuery, [destination]);
//     const dbResponse = rows;
//     if (!dbResponse[0]) {
//       errorMessage.error = "No Trips with that destination";
//       return res.status(status.notfound).send(errorMessage);
//     }
//     successMessage.data = dbResponse;
//     return res.status(status.success).send(successMessage);
//   } catch (error) {
//     errorMessage.error = "Operation was not successful";
//     return res.status(status.error).send(errorMessage);
//   }
// };

module.exports = { createBag, getUserBag };
