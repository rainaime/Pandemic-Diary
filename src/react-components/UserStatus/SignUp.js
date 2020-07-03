import React, { Component } from "react";
import "./styles.css";

export class SignUp extends Component {
    state = {
        username: "",
        password: "",
        shared: [],
        shareables: [],
        invalidSignUp: false,
    };

    addNewUser() {
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
    }

    render() {
        return (
            <>
                <h1 className="popupBox_title">Register</h1>
                <p className="popupBox_instructions">
                    You may register for an account here. Doing so enables you to interact with
                    other users in fun ways: share content, view their diaries, and more!
                </p>
                <form className="login">
                    <div className="login-item">
                        <label htmlFor="username">New username: </label>
                        <input
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
