import React from "react";
import "./styles.css";
import Colors from "../../site-styles/Colors";
import UserStatus from "../UserStatus";

class SiteHeader extends React.Component {
    //need somewhere for access with user info
    constructor(props) {
        super(props);

        this.state = {
            users: [
                { username: "admin", password: "admin" },
                { username: "user", password: "user" },
                { username: "user2", password: "user2" },
            ],
            currentUser: null,
        };
        this.userstatusRef = React.createRef();

        this.updateCurrentUser = this.updateCurrentUser.bind(this);
    }

    // componentDidMount(){
    //     console.log("mount")
    //     this.setState({currentUser: this.state.users[1]})
    //     console.log(this.state.currentUser)
    // }

    addUser(user) {
        console.log(user)
        this.state.users.push(user);
        console.log(this.state)
    }

    updateCurrentUser(user) {
        if (user === null){
            this.setState({currentUser: null})
            this.props.updateCurrentUser(user)
        } else {
            this.setState({ currentUser: user }, () => {
                // console.log(this.state.currentUser)
            });
            this.userstatusRef.current.updateUsername(user.username);
            this.props.updateCurrentUser(user)
        }
    }

    loginCallback = (username, password) => {
        let user = this.state.users.find(function (user, index) {
            if (user.username == username) return true;
        });
        if (user == undefined) {
            return false;
        } else if (user.password == password) {
            this.updateCurrentUser(user);
            return true;
        } else {
            return false;
        }
    };

    logoutCallback = () =>{
        this.updateCurrentUser(null)
    }

    render() {
        return (
            <header
                style={{
                    backgroundColor: Colors.background,
                    color: Colors.textAccent1,
                }}
            >
                <h1>Pandemic Diary</h1>
                <UserStatus
                    ref={this.userstatusRef}
                    loginAttempt={this.loginCallback}
                    username={this.state.currentUser}
                    logout={this.logoutCallback}
                    addUser={this.addUser.bind(this)}
                />
            </header>
        );
    }
}

export default SiteHeader;
