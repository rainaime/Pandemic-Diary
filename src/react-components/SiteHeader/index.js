import React from "react";
import "./styles.css";
import Colors from '../../site-styles/Colors';
import UserStatus from "../UserStatus";
console.log(Colors)

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
            <header style={{ 
                    backgroundColor: Colors.background,
                    color: Colors.textAccent1, 
                }}>
                <h1>Pandemic Diary</h1>
                <UserStatus/>
            </header>
        );
    };
}

export default SiteHeader;
