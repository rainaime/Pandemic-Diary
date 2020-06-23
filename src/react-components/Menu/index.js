import React from "react";
import CollapseButton from "../CollapseButton";
import './styles.css';

class Menu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            collapsed: false,
            maximizedSize: '20%'
        }
    }

    render() {
        return (
            <div className="menu" style={{width: this.state.width }}>
                <ul>
                    <li> <a href="#">News </a></li>
                    <li> <a href="#">Vacation </a></li>
                    <li> <button onClick={this.props.addContent.bind(this.props.state.ref)}>Add Component </button></li>
                    <li> <a href="#">Other stuff </a></li>
                </ul>
                <CollapseButton position='right' collapsed={this.state.collapsed} onClick={this.props.f.bind(this)}/>
            </div>
        );
    };
}

export default Menu;
