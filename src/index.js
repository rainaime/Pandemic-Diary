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
const LandingPage = (
    <div className="landingPage">
        <div className="landingPage_main">
            <div className="landingPage_main_blur">
                <div className="landingPage_main_title" style={mainStyle}>
                    <h1 className="landingPage_title" style={{ color: Colors.textAccent1 }}>
                        Pandemic
                        <i class="fas fa-virus"></i>
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
        {/* Features page
        <div className="landingPage_features" style={{backgroundColor: Colors.background, color: Colors.textColorLight}}>
            <h1>Features</h1>
            <ul>
                <li>dsa</li>
            </ul>
        </div> */}
    </div>
);

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Switch>
                <Route exact path="/" render={() => LandingPage} />
                <Route exact path="/App" render={() => <App />} />
            </Switch>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
