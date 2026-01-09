const express = require("express");
const router = express.Router();
const URL = require("../models/urls");

router.get("/", async(req, res) => {
    if(!req.user) return res.redirect('/login');
    const allurls = await URL.find({ createdBy: req.user._id });
    return res.render("home", {
        urls: allurls,
        id: null  
    });
});

router.get("/signup", (req, res) => {
    return res.render("signup");
});

router.get("/login", (req, res) => {
    return res.render("login", {
        error: null  
    });
});

router.get("/logout", (req, res) => {
    res.clearCookie('uid');
    return res.redirect("/login");
});

module.exports = router;