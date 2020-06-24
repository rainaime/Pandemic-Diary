import React from "react";
import "./styles.css"
import Colors from '../../site-styles/Colors';
import Login from "./Login";

class UserStatus extends React.Component {
    state = {
        username: 'bob',
        loggedIn: false,
        loginAttempt: false,
        loginDiv: null
    }

    loginPrompt = () => {
        // this.setState({loggedIn: true})
        this.setState({loginDiv: this.login()})
    }

    //have to add a way to remove this html after login successful
    login = () => {
        console.log("hello")
        return (
            <Login/>
        );
    }


    render() {
        // TODO: Get user status from server (phase 2)
        const messageStyle = { color: Colors.textAccent1, fontWeight: 'bold' };
        let message = this.state.loggedIn ? 
            <h2 className="message" style={messageStyle}>
                Welcome back, {this.state.username}!
            </h2> : 
            <button type="button" onClick={this.loginPrompt} style={messageStyle}>
                Login or Sign Up Here!
            </button>;
        return (
            <div className="userStatus">
                {message}
                {this.state.loginDiv}
            </div>
        );
    };
}

export default UserStatus;
