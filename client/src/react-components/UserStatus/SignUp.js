import React, { Component } from "react";
import "./styles.css";

/**
 * User SignUp functionality
 *
 * Props:
 * - backToLogin: change state to transit back to login
 * - usersList: list of users
 * - addUser: function to add new user and run callback function
 */
export class SignUp extends Component {
    state = {
        username: "",
        password: "",
        shared: [],
        shareables: [],
        invalidSignUp: false,
    };

    usernameRef = React.createRef();
    passwordRef = React.createRef();

    componentDidUpdate() {
        if (this.props.shouldClear) {
            this.usernameRef.current.value = "";
            this.passwordRef.current.value = "";
            this.props.onPopupExit();
        }
    }

    //add new user if this is a new user
    addNewUser = async () => {
        const response = await fetch("http://localhost:5000/register", {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "manual",
            body: JSON.stringify({ username: this.state.username, password: this.state.password }),
        });
        let usedUserName = false;
        for (const user of this.props.usersList) {
            if (this.state.username === user.username) {
                usedUserName = true;
                this.setState({ invalidSignUp: true });
            }
        }

        if (!usedUserName) {
            this.props.addUser(this.state);
            this.setState({ invalidSignUp: false });
        }

        this.usernameRef.current.value = "";
        this.passwordRef.current.value = "";
    };

    render() {
        return (
            <>
                <h1 className="popupBox_title">Register</h1>
                <p className="popupBox_instructions">
                    You may register for an account here. Doing so enables you to interact with
                    other users in fun ways: share content, view their diaries, and more!
                </p>
                <form className="login" action="/register" method="post">
                    <div className="login-item">
                        <label htmlFor="username">New username: </label>
                        <input
                            ref={this.usernameRef}
                            type="text"
                            name="username"
                            placeholder="Username"
                            onChange={(e) => {
                                this.setState({ username: e.target.value });
                            }}
                            className="userInput"></input>
                    </div>
                    <div className="login-item">
                        <label htmlFor="password">New password: </label>
                        <input
                            ref={this.passwordRef}
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={(e) => {
                                this.setState({ password: e.target.value });
                            }}
                            className="userInput"></input>
                    </div>
                    {this.state.invalidSignUp ? (
                        <span className="signUpValidMessage">Username already being used</span>
                    ) : null}

                    <div className="login-buttons">
                        <button
                            type="button"
                            value="Back to Login"
                            className="loginButton hoverOrange"
                            onClick={() => {
                                this.props.backToLogin();
                                this.setState({ invalidSignUp: false });
                            }}>
                            Back to Login
                        </button>

                        <button
                            type="button"
                            value="Register"
                            className="SignInButton hoverOrange"
                            onClick={this.addNewUser.bind(this)}>
                            Register
                        </button>
                    </div>
                </form>
            </>
        );
    }
}

export default SignUp;
