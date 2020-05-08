var moment = require("moment");
var isEmpty = require("../helpers/validations");
var dbQuery = require("../db/dev/dbQuery");

var { errorMessage, successMessage, status } = require("../helpers/status");

const addProductDetails = async (req, res) => {
  const { title, discription, cost } = req.body;

  const created_on = moment(new Date());

  if (isEmpty(title) || isEmpty(discription) || isEmpty(cost)) {
    errorMessage.error = "All fields are required";
    return res.status(status.bad).send(errorMessage);
  }
  const createProductQuery = `INSERT INTO
          product(title, discription, cost, created_on)
          VALUES($1, $2, $3, $4)
          returning *`;
  const values = [title, discription, cost, created_on];

  try {
    const { rows } = await dbQuery.query(createProductQuery, values);
    const dbResponse = rows[0];
    successMessage.data = dbResponse;
    return res.status(status.created).send(successMessage);
  } catch (error) {
    errorMessage.error = "Unable to add product";
    return res.status(status.error).send(errorMessage);
  }
};

const getAllProducts = async (req, res) => {
  const getAllProductQuery = "SELECT * FROM product ORDER BY id DESC";
  try {
    const { rows } = await dbQuery.query(getAllProductQuery);
    const dbResponse = rows;
    if (dbResponse[0] === undefined) {
      errorMessage.error = "There are no products";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = dbResponse;
    return res.render("productList", { data: successMessage.data });
  } catch (error) {
    errorMessage.error = "An error Occured";
    return res.status(status.error).send(errorMessage);
  }
};

module.exports = { addProductDetails, getAllProducts };
