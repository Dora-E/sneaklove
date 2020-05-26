const express = require("express");
const router = new express.Router();
const sneakerModel = require("./../models/Sneaker");
const protectAdminRoute = require("./../middlewares/protectAdminRoute");
const uploader = require("./../config/cloudinary");




//  category: String[men, women, kids],

//router.get("/products/:id")

module.exports = router;