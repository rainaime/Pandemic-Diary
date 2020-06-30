import React, { Component } from 'react'
import Colors from '../../site-styles/Colors';
import './styles.css';

export class Login extends Component {
    constructor(props){
        super(props);

        this.state = {
            username:'',
            password:''
        }

        this.handleChange = this.handleChange.bind(this);

    }

    getUsername = () => {
        console.log(this.state.password)
    }

    handleClick(e){
        this.loginAttempt()
    }

    keyPressed(e){
        if (e.key === "Enter"){
            this.loginAttempt()
        }
    }
    handleChange(event){
        if (event.target.name === "username")
            this.setState({username: event.target.value})
        else if (event.target.name === "password")
            this.setState({password: event.target.value})
    }

    loginAttempt = () => {
        this.props.loginCallback(this.state.username, this.state.password)
    }

    render() {
        let loginValid;
        if (this.props.loginValid)
            loginValid = <span className="loginValidMessage">Invalid UserName or Passward</span>
        else
            loginValid = null

        return (
            <div className="login">
                <button type="button" onClick={this.props.loginExit}>Exit</button>
                <form>
        
                <label htmlFor="username">Username: </label>
                <input type="text" name="username" placeholder="Username" 
                    onChange = {this.handleChange}
                    className="userInput"></input>

                <label htmlFor="password">Password: </label>
                <input type="password" name="password" placeholder="Password" 
                    onChange = {this.handleChange}
                    onKeyPress = {(event) => this.keyPressed(event)}
                    className="userInput"></input>
                
                <br/>
                {loginValid}
                <br/>

                <button type="button" value="Login" className="loginButton"
                onClick={(event) => this.handleClick(event)}>Login</button>

                <button type="button" value="Sign In" className="SignInButton"
                >Sign In</button>

                </form>


            </div>
        )
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


export default Login
