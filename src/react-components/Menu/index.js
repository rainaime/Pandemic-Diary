import React from "react";
import Colors from "../../site-styles/Colors";
import MenuItem from "./MenuItem";
import UserInfo from "./UserInfo";
import Admin from "./Admin";
import "./styles.css";

class Menu extends React.Component {
    state = {
        display: "filter",
    };

    updateSelection(selectedType) {
        this.props.selectType(selectedType);
    }

    setDisplay = (e) => {
        this.setState({ display: e.target.value });
    };

    render() {
        this.updateSelection.bind(this);
        return (
            <>
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
                    <div className="menu-val">
                        <MenuItem
                            text="All"
                            onClick={() => {
                                this.updateSelection("All");
                            }}
                        />
                        <MenuItem
                            text="News"
                            onClick={() => {
                                this.updateSelection("News");
                            }}
                        />
                        <MenuItem
                            text="Vacation"
                            onClick={() => {
                                this.updateSelection("Vacation");
                            }}
                        />
                        <MenuItem
                            text="Other Stuff"
                            onClick={() => {
                                this.updateSelection("Other Stuff");
                            }}
                        />
                    </div>
                ) : this.props.currentUser && this.props.currentUser.username === "admin" ? (
                    <Admin />
                ) : (
                    <UserInfo currentUser={this.props.currentUser} />
                )}
            </>
        );
    }
}

// class MenuDiv extends React.Component {

//     render() {
//         return (
//             <div className="menu-val">
//                 <MenuItem  text="All" onClick={(e)=>{this.updateSelection.bind(this);this.updateSelection(e);}} />
//                 <MenuItem  text="News" onClick={(e)=>{this.updateSelection.bind(this);this.updateSelection(e);}} />
//                 <MenuItem  text="Vacation" onClick={(e)=>{this.updateSelection.bind(this);this.updateSelection(e);}} />
//                 <MenuItem  text="Other Stuff" onClick={(e)=>{this.updateSelection.bind(this);this.updateSelection(e);}} />
//             </div>
//         );
//     }
// }

{
    /* <div className="menu-val">
                        <button
                            value="All"
                            className="buttonStyle"
                            onClick={(e)=>{this.updateSelection(e.target.value);}}>
                            {this.value}
                        </button>
                        <button
                            value="News"
                            className="buttonStyle"
                            onClick={(e)=>{this.updateSelection(e.target.value);}}>
                            {this.value}
                        </button>
                        <button
                            value="Vacation"
                            className="buttonStyle"
                            onClick={(e)=>{this.updateSelection(e.target.value);}}>
                            {this.value}
                        </button>
                        <button
                            value="OtherStuff"
                            className="buttonStyle"
                            onClick={(e)=>{this.updateSelection(e.target.value);}}>
                            {this.value}
                        </button> */
}

const inlineStyle = {
    display: "inline-block",
    width: "50%",
    fontSize: "1.5vw",
    // marginBottom: '2px'
};

export default Menu;
