import React from "react";
import "./styles.css"

class UserStatus extends React.Component {
    state = {
        username: 'bob',
        loggedIn: false
    }
    
    render() {
        // TODO: Get user status from server (phase 2)
        let message = this.state.loggedIn ? 
            <h2>Welcome back, {this.state.username}!</h2> : 
            <button type="button">Login or Sign Up Here!</button>;

        return (
            <div className="userStatus">
                {message}
            </div>
        );
    };
}

export default UserStatus;
