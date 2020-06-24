import React from "react";
import "./styles.css";
import Colors from '../../site-styles/Colors';
import UserStatus from "../UserStatus";

class SiteHeader extends React.Component {
    //need somewhere for access with user info
    constructor(props){
        super(props)
        
        this.state ={
            users: [
                {username: "john", password: "1234"},
                {username: "will", password: "5678"}
            ],
            //this an object of objects used if each user corresponds to an actual ID rather than username
            // users: {
            //     0: {
            //         username: "john",
            //         password: "1234"
            //     }
            // },
            currentUser: null
        }
        this.userstatusRef = React.createRef();

        this.updateCurrentUser = this.updateCurrentUser.bind(this)
    }

    updateCurrentUser(user){
        this.setState({currentUser: user}, () => {
            console.log(this.state.currentUser)
        })
        this.userstatusRef.current.updateUsername(user.username)
    }

    loginCallback = (username, password) => {
        let user = this.state.users.find(
            function(user, index) {
                if (user.username == username)
                    return true
            })
        if (user == undefined){
            return false
        }else    
            if (user.password == password){
                this.updateCurrentUser(user)
                return true
            } else {                
                return false
            }

    }

    render() {
        console.log("render")
        return (
            <header style={{ 
                    backgroundColor: Colors.background,
                    color: Colors.textAccent1, 
                }}>
                <h1>Pandemic Diary</h1>
                <UserStatus ref={this.userstatusRef}
                loginAttempt = {this.loginCallback} 
                username={this.state.currentUser}/>
            </header>
        );
    };
}

export default SiteHeader;
