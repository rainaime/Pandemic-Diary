import React from "react";
import {isBrowser} from "react-device-detect";
import "./styles.css";

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
                    color: "white",
                }}>
                {isBrowser && <h1 className="siteTitle">Pandemic Diary</h1>}
                {this.props.children}
            </header>
        );
    }
}

export default SiteHeader;
