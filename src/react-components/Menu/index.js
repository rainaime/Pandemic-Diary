import React from "react";
import CollapseButton from "../CollapseButton";
import Colors from '../../site-styles/Colors';
import MenuItem from './MenuItem';
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
            <div className="menu" style={{
                    width: this.state.width,
                    backgroundColor: Colors.background,
                    color: Colors.textColorLight,
                    borderRightColor: Colors.backgroundLightAccent,
                    borderRightWidth: 2,
                    borderRightStyle: 'dotted'
                }}>

                <MenuItem link='#' text='News'/>
                <MenuItem link='#' text='Vacation'/>
                <MenuItem link='#' text='Add Component' onClick={this.props.addContent.bind(this.props.state.ref)}/>
                <MenuItem link='#' text='Other Stuff'/>
                <CollapseButton position='right' collapsed={this.state.collapsed} onClick={this.props.f.bind(this)}/>
            </div>
        );
    };
}

export default Menu;
