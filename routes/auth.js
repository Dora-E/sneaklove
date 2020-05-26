const express = require("express");
const router = new express.Router();
const bcrypt = require("bcrypt");
const userModel = require("./../models/User");
const uploader = require("./../config/cloudinary");

router.get("/signin", (req, res) => {
    res.render("signin");
});

router.post("/signin", (req, res, next) => {
    const userCo = req.body
    if (!userCo === userCo.email || !userCo === userCo.password) {
        req.flash("Warning", "Champs obligatoire")
        res.redirect("/signin")
    }
    userModel
        .findOne({
            email: userCo.email
        })
        .then((user) => {
            if (!user) {
                req.flash("Error", "Identifiants incorrects");
                res.redirect("/signin");
            }
            const checkPassword = bcrypt.compareSync(
                userCo.password,
                user.password,
            );
            if (checkPassword === false) {
                req.flash("error", "Identifiants incorrects");
                res.redirect("/signin");
            }
            const {
                _doc: clone
            } = {
                ...user
            };
            delete clone.password;
            req.session.currentUser = clone;

            res.redirect("/home");

        })
        .catch(next);
});

router.get("/signup", (req, res, next) => {
    res.render("signup");
})


router.post("/signup", (req, res, next) => {
    const user = req.body;
    if (!user.name || !user.password || !user.email || !user.lastname) {
        req.flash("warning", "Merci de remplir tous les champs requis");
        res.redirect("/signup")
    } else {
        userModel
            .findOne({
                email: user.email
            })
            .then((dbres) => {
                if (dbres) {
                    req.flash("warning", "desole cest email n'est pas disponible")
                    res.redirect("/signup")
                }
            })
            .catch(next);

        const salt = bcrypt.genSaltSync(10);
        const hashed = bcrypt.hashSync(user.password, salt);
        console.log("password crypté >>>", hashed);
        user.password = hashed;


        userModel
            .create(user)
            .then((dbres) => {
                req.flash("Success", "Inscription validée!");
                res.redirect("/home");

            })
            .catch(next);
    }

})

module.exports = router;