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
const { Shareable } = require("./models/shareable");

// to validate object IDs
const { ObjectID } = require("mongodb");

// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// express-session for managing user sessions
const session = require("express-session");
app.use(bodyParser.urlencoded({ extended: true }));

// Fetch from external API
const fetch = require("node-fetch");

// Rate limiter
const rateLimit = require("express-rate-limit");

// Express middleware to check whether there is an active user on the session
// cookie.
const sessionChecker = (req, res, next) => {
    if (req.session.user) {
        res.redirect("/"); // Redirect to the main App landing page
    } else {
        next(); // Continue with the route.
    }
};

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

// Inject the sessionChecker middleware to all routes. Runs before the route
// handler to check whether the current session has a logged in user.
app.get("/", sessionChecker, (req, res) => {
    if (req.session.user) {
        res.redirect("/App");
    } else {
        next();
    }
});

// A route to login and create a session
app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // Use the static method on the User model to find a user
    // by their email and password
    User.findByUserPassword(username, password)
        .then((user) => {
            if (!user) {
                res.status(401);
            } else {
                // Add the user's id to the session cookie.
                // We can check later if this exists to ensure we are logged in.
                req.session.user = user._id;
                req.session.username = user.username;
                res.status(200).send({
                    message: "Successful login",
                    username: user.username,
                });
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(401).send(error);
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
            req.session.user = user._id;
            req.session.username = user.username;
            res.status(200).send({
                message: "Successful login",
                username: user.username,
            });
        })
        .catch((err) => {
            if (err.code === 11000) {
                res.status(400).send("User already exists");
            } else {
                res.status(401).send("Passwords must contain at least 10 characters");
            }
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

// A route to get all tweets saved.
app.get("/users", (req, res) => {
    User.find().then(
        (users) => {
            //            res.render('index', tweets);
            res.send({ users });
        },
        (error) => {
            res.status(500).send(error); // server error
        }
    );
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

    tweet
        .save()
        .then((tweets) => {
            res.status(200).send({ tweets });
        })
        .catch((error) => {
            console.log(error);
            res.status(400).send("Bad request");
        });
});

// A route to get all tweets saved.
app.get("/tweet", (req, res) => {
    Tweet.find().then(
        (tweets) => {
            //            res.render('index', tweets);
            res.send({ tweets });
        },
        (error) => {
            res.status(500).send(error); // server error
        }
    );
});

// A route to create new shareable
app.post("/shareable", (req, res) => {
    const shareable = new Shareable(req.body);

    console.log(shareable);

    shareable
        .save()
        .then((share) => {
            //TODO fix what sends here
            res.status(200).send(share);
        })
        .catch((error) => {
            console.log(error);
            res.status(400).send("Bad request");
        });
});

// A route to get all shareable saved.
app.get("/shareable", (req, res) => {
    Shareable.find().then(
        (shareable) => {
            res.send({ shareable });
        },
        (error) => {
            res.status(500).send(error); // server error
        }
    );
});

// A route to update a single shareable by its id.
app.patch("/shareable/:id", (req, res) => {
    // console.log("step one")
    // console.log(req.params.id)
    const id = req.body._id;

    if (!ObjectID.isValid(id)) {
        res.status(404).send();
        return;
    }

    Shareable.findByIdAndUpdate(id, req.body)
        .then((result) => {
            if (!result) {
                console.log;
                res.status(404).send();
            } else {
                console.log(result);
                res.send(result);
            }
        })
        .catch((error) => {
            res.status(400).send();
        });
});

// A route to delete a single shareable by its id.
app.delete("/shareable/:id", (req, res) => {
    const id = req.body._id;

    // Validate id
    if (!ObjectID.isValid(id)) {
        res.status(404).send();
        return;
    }

    // Delete a student by their id
    Shareable.findByIdAndRemove(id)
        .then((result) => {
            if (!result) {
                res.status(404).send();
            } else {
                res.send(result);
            }
        })
        .catch((error) => {
            res.status(500).send(); // server error, could not delete.
        });
});

// Route to fetch news articles from external news source.
app.get("/news", rateLimit({
    windowMs: 60 * 1000, // Rate-limit this endpoint to 5 per minute.
    max: 10,
    message: "Slow down! Too many requests.",
}), (req, res) => {
    const date = req.query.date;
    const htmlRegex = /<[^>]*>?/gm;

    // Validate date
    if (new Date(date) === "Invalid Date" || isNaN(new Date(date))) {
        res.status(400);
    }

    const start = new Date(new Date(date).toDateString());
    const end = new Date(start.toDateString());
    end.setTime(start.getTime() + 86400000);

    const reqUrl = `https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/NewsSearchAPI?autoCorrect=false&pageNumber=1&pageSize=10&q=covid%20canada&safeSearch=true&fromPublishedDate=${start.toISOString()}&toPublishedDate=${end.toISOString()}`;
    // Perform call
    fetch(reqUrl, {
        method: "GET",
        headers: {
            "x-rapidapi-host": "contextualwebsearch-websearch-v1.p.rapidapi.com",
            "x-rapidapi-key": "11db6c5ae1msha4c449476dbaa9ep143b31jsn26807366109a",
        },
    })
        .then((res) => {
            return res.json();
        })
        .then((json) => {
            const obj = json.value.map((a) => {
                return {
                    title: a.title.replace(htmlRegex, ""),
                    url: a.url,
                    description: a.description.replace(htmlRegex, ""),
                    urlToImage: a.image.url.replace(htmlRegex, ""),
                };
            });
            res.status(200).send(obj);
        });
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

/*************************************************/
// Express server listening...
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
