import React from "react";
import "./styles.css";
import Colors from "../../site-styles/Colors";
import { withRouter } from "react-router-dom";

/**
 * Props:
 * - children:      other elements to be placed in the SiteHeader, aside from
 *                  just the site title
 */
class SiteHeader extends React.Component {
    render() {
        return (
            <header
                style={{
                    backgroundColor: "#2a526f",
                    // backgroundColor: Colors.background,
                    color: "white",
                }}>
                <h1 className="siteTitle">Pandemic Diary</h1>
                {this.props.children}
            </header>
        );
    }
}

export default SiteHeader;
