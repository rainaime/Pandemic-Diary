import React from "react";
import MenuItem from "./MenuItem";
import "./styles.css";

/**
 * a menu with filter functionality
 *
 * Props: 
 * - selectType: a callback function to update the type of shareable to appear on map
 * - currentUser: current user using this filter
 */
class Menu extends React.Component {

    //run the callback function if the button is clicked
    updateSelection(selectedType) {
        this.props.selectType(selectedType);
    }

    render() {
        this.updateSelection.bind(this);
        return (
            <div className="menu-val">
                <MenuItem
                    icon={<i class="fas fa-globe"></i>}
                    text={"All"}
                    onClick={() => {
                        this.updateSelection("All");
                    }}
                />
                <MenuItem
                    icon={<i class="far fa-newspaper"></i>}
                    text="News"
                    onClick={() => {
                        this.updateSelection("News");
                    }}
                />
                <MenuItem
                    icon={<i class="fas fa-plane"></i>}
                    text="Vacation"
                    onClick={() => {
                        this.updateSelection("Vacation");
                    }}
                />
                <MenuItem
                    icon={<i class="fas fa-ellipsis-h"></i>}
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
