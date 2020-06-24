import React from "react";
import "./styles.css"
import Colors from '../../site-styles/Colors';
import Login from "./Login";

class UserStatus extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            // username: 'bob',
            username: this.props.username,

            loggedIn: false,
            loginAttempt: false,
        }
    }

    updateUsername(username) {
        this.setState({username: username})
    }

    loginPrompt = () => {
        if (!this.state.loginAttempt)
            this.setState({loginAttempt: true})
        else
            this.setState({loginAttempt: false})
    }

    loginCallback = (username, password) => {
        if (this.props.loginAttempt(username, password)){
            //update username as well
            this.setState({loggedIn: true, loginAttempt: false})
        }
    }

    // updateUser = () => {
    //     this.setState({username: this.props.username})
    // }

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
        let loginComp;
        if (this.state.loginAttempt)
            loginComp = <Login loginCallback={this.loginCallback}/>
        else 
            loginComp = null;

        return (
            <div className="userStatus">
                {message}
                {loginComp}
            </div>
        );
    };
}

export default UserStatus;
