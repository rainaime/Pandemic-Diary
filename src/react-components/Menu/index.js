import React from "react";
import MenuItem from "./MenuItem";
import "./styles.css";

class Menu extends React.Component {
    updateSelection(selectedType) {
        this.props.selectType(selectedType);
    }

    setDisplay = (e) => {
        this.setState({ display: e.target.value });
    };

    render() {
        this.updateSelection.bind(this);
        return (
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
        );
    }
}

export default Menu;
