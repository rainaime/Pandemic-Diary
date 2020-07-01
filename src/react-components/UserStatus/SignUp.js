import React, { Component } from "react";
import "./styles.css";

export class SignUp extends Component {
    state = {
        username: "",
        password: "",
        invalidSignUp: false,
    };

    addNewUser() {
        let usedUserName = false;
        for(const user of this.props.usersList){
            if (this.state.username === user.username) {
                usedUserName = true;
                this.setState({invalidSignUp: true});
            }
        }

        if(!usedUserName){
            this.props.addUser(this.state);
            this.setState({invalidSignUp: false});
        }
    }

    render() {
        return (
            <div className="signUp">
                <form>
                    <label htmlFor="username">New username: </label>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        onChange={(e) => {
                            this.setState({username: e.target.value});
                        }}
                        className="userInput"></input>

                    <label htmlFor="password">New password: </label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={(e) => {
                            this.setState({password: e.target.value});
                        }}
                        className="userInput"></input>
                        
                    <br />
                    {this.state.invalidSignUp ? (
                        <span className="signUpValidMessage">Username already being used</span>
                    ) : null}
                    <br />

                    <button
                        type="button"
                        value="Back to Login"
                        className="loginButton"
                        onClick={() => {
                            this.props.backToLogin();
                            this.setState({invalidSignUp: false});
                        }}>
                        Back to Login
                    </button>

                    <button
                        type="button"
                        value="Register"
                        className="SignInButton"
                        onClick={
                            this.addNewUser.bind(this)
                        }>
                        Register
                    </button>
                </form>
            </div>
        );
    }
}

export default SignUp;

