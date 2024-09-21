const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const session = require('express-session');

const app = express();

// Pug settings
app.set("views", path.join(__dirname, "views"));
app.set("view engine","pug");

// Static files
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({extended: false}));

// Session settings
app.use(
    session({
        secret: "your-secret-key",
        resave: false,
        saveUninitialized: true
    })
);

const authRouter = require("./routes/auth");
const notesRouter = require("./routes/notes")
const profileRouter = require("./routes/profile");

app.use("/notes", notesRouter);
app.use("/auth", authRouter);
app.use("/profile", profileRouter);

app.get("/", (req,res) => {
    if(req.session.loggedIn) {
        res.render("index", {title: "Çevrimiçi Not defteri"});
    } else {
        res.redirect("/auth/login");
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
});
