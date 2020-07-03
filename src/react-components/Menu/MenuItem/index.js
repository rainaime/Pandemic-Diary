import React from "react";
import Colors from '../../../site-styles/Colors';

class MenuItem extends React.Component {
    state = {
        hover: false
    }

    render() {
        const aStyle = {
            color: this.state.hover ? Colors.textAccent1 : Colors.textColorLight,
        }

        return (
            <button className="menuItem" href={this.props.link}
                style={aStyle}
                onClick={this.props.onClick}
                onMouseEnter={() => this.setState({hover: true})}
                onMouseLeave={() => this.setState({hover: false})}
            >
                {this.props.icon}
                {this.props.text}
            </button>
        );
    }
}

export default MenuItem;
