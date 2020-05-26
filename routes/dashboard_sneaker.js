const express = require("express");
const router = new express.Router();
const sneakerModel = require("./../models/Sneaker");
const tagModel = require("./../models/Tag");


router.get("/products_manage", (req, res, next) => {
    res.render("products_manage")

});
router.get("/products_add", (req, res, next) => {
    sneakerModel
        .find()
        .then((category) =>
            res.render("products_add", {
                category,
                title: "creer un produit",
            })
        )
        .catch(next)
});

router.get("/products_add", (req, res) => {
    sneakerModel
        .find()
        .then((dbRes) => {
            console.log(dbRes);
            res.render("products_add", {
                sneakers: dbRes
            });
        })
        .catch((dbErr) => console.log(dbErr));
});


router.post("/products_add", (req, res) => {
    sneakerModel
        .create(req.body)
        .then((dbRes) => {
            console.log("produit ajouté en bdd >>> ", dbRes);
            res.redirect("/products_manage");
        })
        .catch((dbErr) => console.error(dbErr));
});

router.get("product_edit/:id", (req, res, next) => {
    sneakerModel
        .findById(req.params.id)
        .then((products) => {
            tagModel.find().then((category) => {
                res.render("product_edit", {
                    products,
                    category,
                });
            });

        })
        .catch(next);
});





module.exports = router;