import React, { Component } from 'react'
import Colors from '../../site-styles/Colors';

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

        return (
            <div className="login" style={{backgroundColor: Colors.backgroundLightAccent}}>
                <button type="button" onClick={this.props.loginExit}>Exit</button>
                <form>
        
                <label htmlFor="username">Username: </label>
                <input type="text" name="username" placeholder="Username" 
                    onChange = {this.handleChange}
                    required style={formStyle}></input>

                <label htmlFor="password">Password: </label>
                <input type="password" name="password" placeholder="Password" 
                    onChange = {this.handleChange}
                    onKeyPress = {(event) => this.keyPressed(event)}
                    required style={formStyle}></input>

                <button type="button" value="Login" style={buttonStyle}
                onClick={(event) => this.handleClick(event)}>Login</button>
                {/* <input type="submit" value="Register" style={buttonStyle}></input> */}

                </form>


            </div>
        )
    }
}

//add on click functions verifying the values of login when login is clicked

const formStyle = {
    display: 'inline-block',
    float: 'right',
    width: '65%',
    marginTop: '6px',
    marginRight: '1vw'
}

const buttonStyle = {
    position: 'center',
    width: '30%',
    backgroundColor: Colors.backgroundDarkAccent,
    color: Colors.textAccent1,
    // marginLeft: 'auto',
    // marginRight: 'auto',
    padding: '12px',
    margin: '8%',
    // border: none,
    // border-radius: 4px,
    // margin: 5px 0,
    // opacity: 0.85,
    display: 'inline-block'
    // float: 'left'
    // font-size: 17px,
}


export default Login
