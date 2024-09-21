const express = require("express");
const router = express.Router();
const userStore = require('./userStore');

// Show the profile view and update form
router.get("/", (req, res) => {
    const user = userStore.getUser();
    if (req.session.loggedIn) {
        res.render("profile", { title: "Profil", username: user.username });
    } else {
        res.redirect("/auth/login");
    }
});

// Update profile
router.post("/update", (req, res) => {
    const { username, oldPassword, newPassword } = req.body;
    const user = userStore.getUser();
    if (user.password === oldPassword) {
        user.username = username;
        user.password = newPassword;
        userStore.setUser(user);
        res.render("profile", { 
            title: "Profil", 
            username: user.username, 
            success: "Profil başarıyla güncellendi."
        });
    } else {
        res.render("profile", { 
            title: "Profil", 
            username: user.username, 
            error: "Eski şifre yanlış."
        });
    }
});

module.exports = router;