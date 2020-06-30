import React from "react";
import "./styles.css";
import Colors from "../../site-styles/Colors";
import UserStatus from "../UserStatus";

class SiteHeader extends React.Component {
    render() {
        return (
            <header
                style={{
                    backgroundColor: Colors.background,
                    color: Colors.textAccent1,
                }}>
                <h1>Pandemic Diary</h1>
                {this.props.children}
            </header>
        );
    }
}

export default SiteHeader;
