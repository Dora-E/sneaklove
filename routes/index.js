const express = require("express");
const router = express.Router();

console.log(`
-----------------------------
-----------------------------
node says : wax on / wax off !
-----------------------------
-----------------------------`);

router.get("/home", (req, res) => {
  res.render("home");
});

router.get("/sneakers/:id", (req, res) => {
  res.render("products");
});

router.get("/one-product/:id", (req, res) => {
  res.render("one-product");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/signin", (req, res) => {
  res.render("signin");
});


module.exports = router;