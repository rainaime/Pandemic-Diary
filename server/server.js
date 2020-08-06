"use strict";

const path = require("path");
const express = require("express");
// starting the express server
const app = express();
app.use(express.static(path.join(__dirname, "build")));

const cors = require("cors");
app.use(cors());

// mongoose and mongo connection
const { mongoose } = require("./db/mongoose");
mongoose.set("useFindAndModify", false); // for some deprecation issues

// import the mongoose models
const { User } = require("./models/user");
const { Tweet } = require("./models/tweet");

// to validate object IDs
const { ObjectID } = require("mongodb");

// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// express-session for managing user sessions
const session = require("express-session");
app.use(bodyParser.urlencoded({ extended: true }));

// Create a session cookie
app.use(
    session({
        secret: "T8O1T5a6l8l9Y0S4EgC7R5E3Tbpma6N1DDsiVaNry", // Salt
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60000,
            httpOnly: true,
        },
    })
);

// A route to login and create a session
app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // Use the static method on the User model to find a user
    // by their email and password
    User.findByUserPassword(username, password)
        .then((user) => {
            if (!user) {
                res.status(401).send("Username doesn't exist");
            } else {
                // Add the user's id to the session cookie.
                // We can check later if this exists to ensure we are logged in.
                req.session.user = user._id;
                req.session.username = user.username;
                res.status(200).send("Successful login");
            }
        })
        .catch((error) => {
            res.status(400).send("Bad request");
        });
});

// A route to create a new user account. If successful, the user is logged in
// and a session is created.
app.post("/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = new User({
        username: username,
        password: password,
    });

    user.save()
        .then((user) => {
            res.status(200).send("Account successfully created");
        })
        .catch((error) => {
            res.status(400).send("Bad request");
        });
});

// A route to logout a user, destroying the associated session
app.get("/logout", (req, res) => {
    // Remove the session
    req.session.destroy((error) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.status(200).send("Successful logout");
        }
    });
});


// A route to create new tweet. If successful, the tweet is saved in the
// tweets data so any users can use it
app.post("/tweet", (req, res) => {
    const username = req.body.username;
    const content = req.body.content;

    const tweet = new Tweet({
        username: username,
        content: content,
    });

    tweet.save()
        .then((tweets) => {
            res.status(200).send({tweets});
        })
        .catch((error) => {
            console.log(error);
            res.status(400).send("Bad request");
        });
});

// A route to get all tweets saved.
app.get("/tweet", (req, res) => {
    Tweet.find().then(
        tweets => {
//            res.render('index', tweets);
            res.send({ tweets });
        },
        error => {
            res.status(500).send(error); // server error
        }
    );
});

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

/*************************************************/
// Express server listening...
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
