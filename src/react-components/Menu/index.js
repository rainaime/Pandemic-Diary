import React from "react";
import './styles.css';

class Menu extends React.Component {
    render() {
        return (
            <div className="menu">
                <ul>
                    <li> <a href="#">News </a></li>
                    <li> <a href="#">Vacation </a></li>
                    <li> <a href="#">Other stuff </a></li>
                </ul>
            </div>
        );
    };
}

export default Menu;
