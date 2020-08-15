import React from "react";
import ReactDOM from "react-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./index.css";

import * as serviceWorker from "./serviceWorker";
import { Link, Route, Switch, BrowserRouter } from "react-router-dom";

import App from "./App";
import Colors from "../src/site-styles/Colors";

const mainStyle = {
    borderTopStyle: "solid",
    borderBottomStyle: "solid",
    borderWidth: "5px",
    borderColor: Colors.background + "B5",
    backgroundColor: Colors.background + "A5",
};

const pandocFeatures = (
    <>
        <h1 className="landingPage_title" style={{ color: Colors.textAccent1 }}>
            Features
        </h1>
        <p>Here are some examples of user interactions that are available:</p>
        <div className="landingPage_features_flex">
            <div>
                <p>
                    Collapsing side menus: you can click the collapse button on the side menus to
                    collapse them so that the map is larger.
                </p>
            </div>
            <div>
                <p>
                    Selecting a date to travel to: by clicking and dragging on the Timeline, you can
                    see content specific to a certain day.
                </p>
                <div>
                    <img alt="" src="/timeline.png" />
                </div>
            </div>

            <div>
                <p>Viewing News specific to a certain day</p>
                <div>
                <img alt="" src="/news.png" />
                </div>
            </div>
            <div>
                <p>
                    Adding a marker (text or image) to the map: when hovering over the PopoutButton,
                    some shareables will show up. Click them to enable the adding mode, and click
                    somewhere on the to place the marker. A popup window will appear, allowing you
                    to modify the contents of the marker you placed.
                </p>
                <div>
                <img alt="" src="/addingmarkers.gif" />
                </div>
            </div>
            <div>
                <p>
                    Categorizing markers: currently, we have certain groups you can place shareables
                    in: news, vacation, and other. With this, you can describe the current state of
                    affairs in the world or plan a vacation! Select from the filters on the left
                    side to narrow down your search.
                </p>
            </div>
            <div>
                <p>
                    Editing markers you’ve placed: currently, there is the option to share your
                    marker, edit its contents, or delete it.
                </p>
                <div>
                <img alt="" src="/editingmarkers.png" />
                </div>
            </div>
            <div>
                <p>
                    When a marker is shared with another user (by clicking the share button and
                    typing in the user’s username), the other user will see the shareable pop up in
                    their notifications box.
                </p>
                <div>
                <img alt="" src="/sharedmarkers.png" />
                </div>
            </div>
            <div>
                <p>
                    When the admin is logged in, the “Info” box in the left menu panel contains an
                    admin panel in which the administrator can view reported markers to moderate the
                    content, or delete problematic users.
                </p>
            </div>
        </div>
    </>
);

const LandingPage = (
    <div className="landingPage">
        <div className="landingPage_main">
            <div className="landingPage_main_blur">
                <div className="landingPage_main_title" style={mainStyle}>
                    <h1 className="landingPage_title" style={{ color: Colors.textAccent1 }}>
                        Pandemic
                        <i className="fas fa-virus"></i>
                        Diary
                    </h1>
                    <p className="landingPage_desc" style={{ color: Colors.textColorLight }}>
                        A website to help you keep track of your plans during and after the
                        pandemic.
                    </p>
                </div>
                <Link
                    className="landingPage_enter"
                    style={{ ...mainStyle, color: Colors.textColorLight }}
                    to="./App">
                    Enter Site
                </Link>
            </div>
        </div>
        <div
            className="landingPage_features"
            style={{ backgroundColor: Colors.background + "D3", color: Colors.textColorLight }}>
            {pandocFeatures}
        </div>
    </div>
);

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Switch>
                <Route exact path="/App" render={() => <App showLogin={false}/>} />
                <Route exact path="/App/login" render={() => <App showLogin={true}/>}/>
                <Route path="/" render={() => LandingPage} />
            </Switch>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
