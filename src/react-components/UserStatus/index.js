import React from "react";
import "./styles.css";
import Colors from "../../site-styles/Colors";
import Login from "./Login";
import SignUp from "./SignUp";

class UserStatus extends React.Component {
    render() {
        // TODO: Get user status from server (phase 2)
        const messageStyle = { color: Colors.textAccent1, fontWeight: "bold", display: "inline" };
        const message = this.props.currentUser ? (
            <h2 className="userStatus" style={messageStyle}>
                Welcome back, {this.props.currentUser.username}!
            </h2>
        ) : (
            <button className="userStatus" type="button" onClick={this.props.openLoginMenu} style={messageStyle}>
                Login or Sign Up Here!
            </button>
        );

        const logOut = this.props.currentUser ? (
            <button className="userStatus" onClick={this.props.logout}>Log Out</button>
        ) : null;

        return (
            <div onClick={this.props.onClick}>
                {message}
                {logOut}
            </div>
        );
    }
}

class UserStatusMenu extends React.Component {
    state = {
        currentComp: "login",
        invalidLogin: false,
    };

    loginCallback = (username, password) => {
        let user = this.props.users.find(function (user, index) {
            return user.username === username;
        });
        if (user === undefined) {
            this.setState({
                invalidLogin: true,
            });
            return false;
        } else if (user.password === password) {
            this.setState({
                invalidLogin: false,
            });
            this.props.updateCurrentUser(user);
            this.props.onSuccess();
            return true;
        } else {
            this.setState({
                invalidLogin: true,
            });
            return false;
        }
    };

    render() {
        const loginComp = (
            <Login
                loginCallback={this.loginCallback}
                invalidLogin={this.state.invalidLogin}
                goToSignup={() => {
                    this.setState({ currentComp: "signup" });
                    this.setState({invalidLogin: false});
                }}
            />
        );
        const signupComp = (
            <SignUp
                backToLogin={() => {
                    this.setState({ currentComp: "login" });
                }}
                usersList={this.props.users}
                addUser={(newUser) => {this.props.addUser(newUser); this.loginCallback(newUser.username, newUser.password)}}
            />
        );

        return this.state.currentComp === "login" ? loginComp : signupComp;
    }
}

export { UserStatus, UserStatusMenu };
