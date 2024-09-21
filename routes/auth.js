const express = require("express");
const router = express.Router();
const userStore = require('./userStore');

// Show login page
router.get("/login", (req, res) => {
    res.render('login', { title: "Giriş Yap", error: null });
});

// Handle login process
router.post("/login", (req, res) => {
    const { username, password } = req.body;
    const user = userStore.getUser();
    if (username === user.username && password === user.password) {
        req.session.loggedIn = true;
        res.redirect("/");
    } else {
        res.render("login", {
            title: "Giriş Yap",
            error: "Geçersiz kullanıcı adı ve şifre"
        });
    }
});

// Handle log out process
router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.redirect("/");
        }
        res.redirect("/auth/login");
    });
});

module.exports = router;
