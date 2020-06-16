import React, { Component } from 'react'

export class Login extends Component {
    render() {
        return (
            <div className="login">
                <form>

          
        
                <label for="username">Username: </label>
                <input type="text" name="username" placeholder="Username" required style={formStyle}></input>

                <label for="password">Password: </label>
                <input type="password" name="password" placeholder="Password" required style={formStyle}></input>

                <input type="submit" value="Login" style={buttonStyle}></input>
                <input type="submit" value="Register" style={buttonStyle}></input>

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
