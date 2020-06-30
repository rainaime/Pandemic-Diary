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

    updateSelection = (e) => {
        this.props.selectType(e.target.text)
    }

    render() {
        return (
            <div className="menu" style={{
                    width: this.state.width,
                    backgroundColor: Colors.background,
                    color: Colors.textColorLight,
                borderRightColor: this.state.collapsed ? 'none' : Colors.backgroundLightAccent,
                    borderRightWidth: this.state.collapsed ? 'none' : 2,
                    borderRightStyle: this.state.collapsed ? 'none' : 'dotted'
                }}>

                <MenuItem link='#' text='News' onClick={this.updateSelection}/>
                <MenuItem link='#' text='Vacation' onClick={this.updateSelection}/>
                <MenuItem link='#' text='Other Stuff' onClick={this.updateSelection}/>
                {/* REMOVE: this is here just for debugging */}
                <CollapseButton position='right' collapsed={this.state.collapsed} onClick={this.props.f.bind(this)}/>
            </div>
        );
    };
}

export default Menu;
