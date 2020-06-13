import React from "react";
import "./styles.css";

import UserStatus from "../UserStatus";

class SiteHeader extends React.Component {
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
