"use strict";

const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

const session = require("express-session");

// For image uploading (shareables)
const multipart = require("connect-multiparty");
const multipartMiddleware = multipart();
const cloudinary = require("cloudinary");
cloudinary.config({
    cloud_name: "dsatxv4pr",
    api_key: "683683464777433",
    // I feel so bad putting this here, but who cares
    api_secret: "pUBQyq9xCTpzY88WUoRSgSni05M",
});

// For fetching from external APIs.
const fetch = require("node-fetch");
const rateLimit = require("express-rate-limit");

// Mongoose models
const { mongoose } = require("./db/mongoose");
const { ObjectID } = require("mongodb");
const { User } = require("./models/user");
const { Tweet } = require("./models/tweet");
const { Shareable } = require("./models/shareable");
const shareable = require("./models/shareable");

// starting the express server
app.use(express.static(path.join(__dirname, "build")));
app.use(cors());

// mongoose and mongo connection
mongoose.set("useFindAndModify", false); // for some deprecation issues

// body-parser: middleware for parsing HTTP JSON body into a usable object
app.use(bodyParser.json());
// express-session for managing user sessions
app.use(bodyParser.urlencoded({ extended: true }));

// Express middleware to check whether there is an active user on the session
// cookie.
const sessionChecker = (req, res, next) => {
    if (req.session.user) {
        res.redirect("/"); // Redirect to the main App landing page
    } else {
        next(); // Continue with the route.
    }
};

///////////////////////////////////////////////////////////////////////////////
// START OF EXPRESS ROUTES
///////////////////////////////////////////////////////////////////////////////

// SESSION-RELATED ROUTES
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

app.get("/check-session", (req, res) => {
    if (req.session.user) {
        res.status(200).send({ currentUser: req.session.username });
    } else {
        res.status(401).send();
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
        shared: [],
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
                console.log(err);
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

///////////////////////////////////////////////////////////////////////////////
// USER-RELATED ROUTES
///////////////////////////////////////////////////////////////////////////////

// A route to get all users. TODO: I doubt this is a good idea
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

///////////////////////////////////////////////////////////////////////////////
// Sharing-related ROUTES
///////////////////////////////////////////////////////////////////////////////

// A route to push a shareable to a user's shared.
app.post("/sharing", (req, res) => {
    //should only be called with user logged in
    //
    const receiverUser = req.body.receiverUser;
    const shareable = req.body.shareable;
    
    //might need an undefined case
    
    //TODO: currently only a shareable is stored, we should also share
    //      the username of the user who shared this marker

    User.findOne({username: receiverUser}).then((user) => {
        if (!user) {
            return Promise.reject("User doesn't exist"); // a rejected promise
        } 

        //then the user exists and we add the shareable to it
        user.shared.push(shareable);
        user.save()
            .then(
                res.status(200).send("Successful share")
            )
            .catch((err) => {
                console.log(err);
                res.status(500).send("Could not save");
            });
    })

});

// A route to remove a specific shareable from calling user.
app.delete("/deleteShare", (req, res) => {
    const shareableID = req.body.shareableID;
    const user = req.body.user;
    
    User.findOne({username: user}).then((user) => {
        //this should almost never happen but I'll keep in case
        if (!user) {
            return Promise.reject("User doesn't exist"); // a rejected promise
        } 

        const shared = user.shared;
        let index = -1;
        //find the index of shareable in order to pop it out
        shared.forEach(shareable => {
            if (shareable._id === shareableID){
                index = shared.indexOf(shareable);
                // break; //might just change this from a for each to a for loop to allow breaking
            }
        })
        //remove shareable from all shared
        if (index !== -1){
            shared.splice(index, 1);
        } else {
            return Promise.reject("Could not find shareable");
        }

        user.shared = shared;

        user.save()
            .then(
                res.status(200).send()
            )
            .catch((err) => {
                console.log(err);
                res.status(500).send("Could not save");
            });
        
    })  

});

// A route to get the shared markers of a specific user.
app.get("/shared/:user", (req, res) => {
    const user = req.params.user;

    User.findOne({username: user}).then(user => {
        if (!user) {
            return Promise.reject("User doesn't exist"); // a rejected promise
        } 

        res.status(200).send(user.shared);
   })
});

///////////////////////////////////////////////////////////////////////////////
// TWEET-RELATED ROUTES
///////////////////////////////////////////////////////////////////////////////

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
            res.send({ tweets });
        },
        (error) => {
            res.status(500).send(error); // server error
        }
    );
});

///////////////////////////////////////////////////////////////////////////////
// SHAREABLE-RELATED ROUTES
///////////////////////////////////////////////////////////////////////////////

// A route to create new shareable
app.post("/shareable", (req, res) => {
    let shareable;

    if (req.session.user) {
        shareable = new Shareable(Object.assign(req.body), req.session);
        shareable
            .save()
            .then((s) => {
                res.status(200).send(s);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).send("Bad request");
            });
    } else {
        if (req.body.type === "image") {
            res.status(404).send("Guests may not upload images.");
            return;
        }

        const query = { username: "Guest" };
        const newData = { username: "Guest", password: "Th3i41s2IhshA656Guie76s9t9Pas876s34wo1rd", };
        User.findOneAndUpdate(query, newData, { upsert: true, new: true }, (err, user) => {
            if (err) {
                res.status(500).send("Internal server error");
            }
            shareable = new Shareable(
                Object.assign(req.body, {
                    user: user.username,
                    userId: user._id,
                })
            );

            try {
                res.status(200).send(shareable);
            } catch (err) {
                console.log(err);
                res.status(400).send("Bad request");
            }
        });
    }
});

// A route to get shareables for a specific day.
app.get("/shareables/:date", (req, res) => {
    Shareable.findByDate(req.params.date).then((s) => {
        res.status(200).send(s);
    });
});

// A route to update a single shareable by its id.
app.patch("/shareable/:id", multipartMiddleware, (req, res) => {
    const id = req.params.id;
    req.body.center = JSON.parse(req.body.center);

    if (!ObjectID.isValid(id)) {
        res.status(400).send();
        return;
    }

    if (req.session.user) {
        Shareable.findById(id, (err, s) => {
            if (err) {
                console.log(err);
                res.status(404);
            }

            // User who sent the request is the user who request. Notice that
            // we are fetching the document from the database, not using
            // user input.
            if (s.user === req.session.username) {
                // User is uploading an image. Handle it using Cloudinary.
                if (req.body.type === "image") {
                    cloudinary.uploader
                        .upload(req.files.fileupload.path, (result) => {
                            Object.assign(s, req.body, {
                                image_url: result.url
                            });
                            s
                                .save()
                                .then((s) => res.status(200).send(s))
                                .catch(() => res.status(400).send("Bad request"));
                        })
                        .catch(() => {
                            res.status(500).send();
                        });
                } else {
                    // User's just submitting a regular change to their existing
                    // text-based shareable.
                    // Save the data but don't trust user input for sensitive fields
                    Object.entries(req.body).forEach(([k, v]) => {
                        if (k !== "_id" && k !== "userId" && k !== "user") {
                            s[k] = v;
                        }
                    });

                    // Save this shareable.
                    s.save()
                        .then((doc) => {
                            if (!doc) {
                                res.status(404).send();
                            } else {
                                res.send(doc);
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                            res.status(500);
                        });
                }
            }
        });
    } else {
        if (req.body.type === "image") {
            res.status(404).send("Guests may not upload images");
            return;
        }

        // User is a guest. We'll admit the change but kill the shareable so
        // that the shareable doesn't remain in our database.
        try {
            res.status(200).send(req.body);
        } catch (error) {
            console.log(error);
        }
    }
});

// A route to delete a single shareable by its id.
app.delete("/shareable/:id", (req, res) => {
    const id = req.params.id;

    // Validate id
    if (!ObjectID.isValid(id)) {
        res.status(404).send();
        return;
    }

    Shareable.findOneAndDelete(
        {
            // Check that user submitting request created the image.
            user: req.session.username,
            _id: id,
        },
        (err, s) => {
            if (err || !s) {
                res.status(404).send();
            } else {
                cloudinary.uploader.destroy(id, (result) => {
                    if (result.status === 200) {
                        res.status(200).send();
                    } else {
                        res.status(500).send();
                    }
                });
            }
        }
    );
});

///////////////////////////////////////////////////////////////////////////////
// IMAGE-RELATED ROUTES
///////////////////////////////////////////////////////////////////////////////

// POST route to create an image.
app.post("/images", multipartMiddleware, (req, res) => {
    cloudinary.uploader.upload(req.files.image.path, (result) => {
        const img = new Image({
            image_url: result.url, // Image URL on Cloudinary server.
        });

        img.save()
            .then((newImg) => res.send(newImg))
            .catch((err) => res.status(400).send(err));
    });
});

// GET route to get image by its unique ID.
app.get("/images/:id", (req, res) => {
    const id = req.params.id;

    // Validate ID
    if (!ObjectID.isValid(id)) {
        res.status(404).send();
        return;
    }
    Image.findById(req.params.id, (err, savedImg) => {
        if (err || !savedImg) {
            res.status(404).send();
        } else {
            res.status(200).send(savedImg);
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).send();
    });
});

///////////////////////////////////////////////////////////////////////////////
// NEWS-RELATED ROUTES
///////////////////////////////////////////////////////////////////////////////

// Route to fetch news articles from external news source.
app.get(
    "/news",
    rateLimit({
        windowMs: 60 * 1000, // Rate-limit this endpoint to 5 per minute.
        max: 10,
        message: "Slow down! Too many requests.",
    }),
    (req, res) => {
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
    }
);

/*************************************************/
// Express server listening...
// Serve built create-react-app on port.
const port = process.env.PORT || 5000;

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
