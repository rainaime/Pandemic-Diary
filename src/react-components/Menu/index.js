import React from "react";
import Colors from "../../site-styles/Colors";
import MenuItem from "./MenuItem";
import UserInfo from "./UserInfo";
import "./styles.css";

class Menu extends React.Component {
    state = {
        display: "filter",
    };

    updateSelection = (e) => {
        this.props.selectType(e.target.text);
    };

    setDisplay = (e) => {
        console.log(e.target.value);
        this.setState({ display: e.target.value });
    };

    render() {
        return (<>
                <div className="options">
                    <button style={inlineStyle} value="filter" onClick={this.setDisplay.bind(this)}>
                        Filter
                    </button>
                    <button
                        style={inlineStyle}
                        value="user info"
                        onClick={this.setDisplay.bind(this)}>
                        User Info
                    </button>
                </div>
                {this.state.display === "filter" ? (
                    <MenuDiv />
                ) : (
                    <UserInfo currentUser={this.props.currentUser} />
                )}</>
        );
    }
}

class MenuDiv extends React.Component {
    render() {
        return (
            <div className="menu-val">
                <MenuItem link="#" text="News" onClick={this.updateSelection} />
                <MenuItem link="#" text="Vacation" onClick={this.updateSelection} />
                <MenuItem link="#" text="Other Stuff" onClick={this.updateSelection} />
            </div>
        );
    }
}

const inlineStyle = {
    display: "inline-block",
    width: "50%",
    fontSize: "1.5vw",
    // marginBottom: '2px'
};

export default Menu;
