import React, { Component } from "react";
import Colors from "../../site-styles/Colors";
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
            <div className="login">
                <form>
                    <label htmlFor="username">Username: </label>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        onChange={this.handleChange}
                        className="userInput"></input>

                    <label htmlFor="password">Password: </label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={this.handleChange}
                        onKeyPress={(event) => this.keyPressed(event)}
                        className="userInput"></input>

                    <br />
                    {this.props.invalidLogin ? (
                        <span className="loginValidMessage">Invalid Username or Password</span>
                    ) : null}
                    <br />

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
                </form>
            </div>
        );
    }
}

//add on click functions verifying the values of login when login is clicked

// const formStyle = {
//     display: 'inline-block',
//     float: 'right',
//     width: '65%',
//     marginTop: '6px',
//     marginRight: '1vw'
// }

// const buttonStyle = {
//     position: 'center',
//     width: '30%',
//     backgroundColor: Colors.backgroundDarkAccent,
//     color: Colors.textAccent1,
//     padding: '12px',
//     margin: '8%',
//     display: 'inline-block'
// }

export default Login;
