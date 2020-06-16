import React from "react";
import "./styles.css";

import UserStatus from "../UserStatus";

class SiteHeader extends React.Component {
    //need somewhere for access with user info
    state ={
        users: {
            0: {
                username: "john"
            }
        },
        currentUser: null
    }

    render() {
        return (
            <header>
                <h1>Pandemic Diary</h1>
                <UserStatus/>
            </header>
        );
    };
}

export default SiteHeader;
