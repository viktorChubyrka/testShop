var express = require("express");

var {
  addProductDetails,
  getAllProducts,
} = require("../controllers/productController");

const router = express.Router();

router.post("/product", addProductDetails);
router.get("/product", getAllProducts);

module.exports = router;
