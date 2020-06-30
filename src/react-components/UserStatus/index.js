import React from "react";
import "./styles.css"
import Colors from '../../site-styles/Colors';
import Login from "./Login";
import SignUp from "./SignUp";

class UserStatus extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            username: this.props.username,

            loggedIn: false,
            loginAttempt: false,
            signUpAttempt: false,
            InvalidLoginMessage: false,
        }
    }

    updateUsername(username) {
        this.setState({username: username})
    }

    loginPrompt = () => {
        if (!this.state.loginAttempt){
            if(this.state.signUpAttempt){
                this.setState({signUpAttempt: false})
            }
            else{
                this.setState({loginAttempt: true})
            }
        }
        else{
            this.setState({loginAttempt: false})
            this.setState({signUpAttempt: false})
        }
    }

    loginCallback = (username, password) => {
        if (this.props.loginAttempt(username, password)){
            //update username as well
            this.setState({loggedIn: true, loginAttempt: false})
            this.setState({InvalidLoginMessage: false})
        }
        else{
            this.setState({InvalidLoginMessage: true})
        }
    }
    attemptLogout = () => {
        if (this.state.loggedIn){
            this.setState({loggedIn: false, loginAttempt: false})
            this.props.logout()
        }
    }

    signUpPrompt(){
        if (this.state.signUpAttempt){
            this.setState({signUpAttempt: false});
            this.setState({loginAttempt: true})
        }
        else{
            this.setState({signUpAttempt: true})
            this.setState({loginAttempt: false})
        }
    }

    // updateUser = () => {
    //     this.setState({username: this.props.username})
    // }

    render() {
        // TODO: Get user status from server (phase 2)
        const messageStyle = { color: Colors.textAccent1, fontWeight: 'bold', display: "inline" };
        let message = this.state.loggedIn ? 
            <h2 className="message" style={messageStyle}>
                Welcome back, {this.state.username}!
            </h2> : 
            <button type="button" onClick={this.loginPrompt} style={messageStyle}>
                Login or Sign Up Here!
            </button>;
        let loginComp;
        if (this.state.loginAttempt)
            loginComp = <Login loginCallback={this.loginCallback} loginExit={this.loginPrompt} 
            loginValid={this.state.InvalidLoginMessage} signIn={this.signUpPrompt.bind(this)}/>
        else 
            loginComp = null;
        
        let SignUpComp;
        if (this.state.signUpAttempt)
            SignUpComp = <SignUp backToLogin={this.signUpPrompt.bind(this)} signUpExit={this.loginPrompt}
            addUser={this.props.addUser}/>
        else 
            SignUpComp = null;
        
        let logOut;
        if (this.state.loggedIn)
            logOut = <button onClick={this.attemptLogout}>Log Out</button>
        else
            logOut = null

        return (
            <div className="userStatus">
                {message}
                {logOut}
                {loginComp}
                {SignUpComp}
            </div>
        );
    };
}

export default UserStatus;
