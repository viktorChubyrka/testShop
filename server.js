var express = require("express");
var cors = require("cors");
const bagRoute = require("./app/routes/bagRoute");
const usersRoute = require("./app/routes/userRoute");
const productRoute = require("./app/routes/productRoute");

const app = express();

// Add middleware for parsing URL encoded bodies (which are usually sent by browser)
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", __dirname + "/app/views/pages");

app.use("/api", bagRoute);
app.use("/api", usersRoute);
app.use("/api", productRoute);

app.get("/registr", (req, res) => {
  res.render("registration");
});
app.get("/addProduct", (req, res) => {
  res.render("addProduct");
});
app.get("/search", (req, res) => {
  res.render("search");
});
app.get("/", (req, res) => {
  res.render("index");
});

app.listen("3000").on("listening", () => {
  console.log(`🚀 are live on ${3000}`);
});
