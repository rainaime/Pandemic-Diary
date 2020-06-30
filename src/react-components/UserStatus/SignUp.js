import React, { Component } from 'react'
import Colors from '../../site-styles/Colors';
import './styles.css';

export class SignUp extends Component {

    state = {
        username: '',
        password: '',
    }

    addNewUser(){
        //todo: fix this so that it checks if the user name is already being used later
        if (this.state.username !== ''){
            this.props.addUser(this.state)
        }
    }

    render() {
        return (
            <div className="signUp">
            <button type="button" onClick={this.props.signUpExit}>Exit</button>
            <form>
    
            <label htmlFor="username">New username: </label>
            <input type="text" name="username" placeholder="Username" 
                onChange = {(e)=>{this.state.username = e.target.value}}
                className="userInput"></input>

            <label htmlFor="password">New password: </label>
            <input type="password" name="password" placeholder="Password" 
                onChange = {(e)=>{this.state.password = e.target.value}}
                className="userInput"></input>

            <button type="button" value="Login" className="loginButton"
            onClick={this.props.backToLogin}
            >Back to Login</button>

            <button type="button" value="Sign In" className="SignInButton"
            onClick={this.addNewUser.bind(this)}
            >Register</button>

            </form>


        </div>
        )
    }
}

export default SignUp