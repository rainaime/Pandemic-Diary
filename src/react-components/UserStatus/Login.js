import React, { Component } from "react";
import "./styles.css";

export class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
        };

        this.handleChange = this.handleChange.bind(this);
    }

    getUsername = () => {
        console.log(this.state.password);
    };

    keyPressed(e) {
        if (e.key === "Enter") {
            this.loginAttempt();
        }
    }
    handleChange(event) {
        if (event.target.name === "username") this.setState({ username: event.target.value });
        else if (event.target.name === "password") this.setState({ password: event.target.value });
    }

    loginAttempt = () => {
        this.props.loginCallback(this.state.username, this.state.password);
    };

    render() {
        return (
            <>
                <h1 className="popupBox_title">Login</h1>
                <p className="popupBox_instructions">
                    You may login to your account here. Doing so enables you to interact with
                    other users in fun ways: share content, view their diaries, and more!
                </p>
                <form className="login">
                    <div className="login-item">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            onChange={this.handleChange}
                            className="userInput"></input>
                    </div>

                    <div className="login-item">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={this.handleChange}
                            onKeyPress={(event) => this.keyPressed(event)}
                            className="userInput"></input>
                    </div>

                    {this.props.invalidLogin ? (
                        <span className="loginInvalidMessage">Invalid Username or Password</span>
                    ) : null}

                    <div className="login-buttons">
                        <button
                            type="button"
                            value="Login"
                            className="loginButton"
                            onClick={this.loginAttempt}>
                            Login
                        </button>

                        <button
                            type="button"
                            value="Sign In"
                            className="SignInButton"
                            onClick={this.props.goToSignup}>
                            Sign Up
                        </button>
                    </div>
                </form>
            </>
        );
    }
}

export default Login;
