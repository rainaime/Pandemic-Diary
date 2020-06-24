import React from "react";
import Colors from '../../../site-styles/Colors';

class MenuItem extends React.Component {
    state = {
        hover: false
    }

    render() {
        const aStyle = {
            width: '100%',
            color: this.state.hover ? Colors.textAccent1 : Colors.textColorLight,
            textDecoration: 'none',
            fontWeight: 600,
            padding: '12px 0'
        }

        return (
            <a  href={this.props.link}
                style={aStyle}
                onClick={this.props.onClick}
                onMouseEnter={() => this.setState({hover: true})}
                onMouseLeave={() => this.setState({hover: false})}
            >
                {this.props.text}
            </a>
        );
    }
}

export default MenuItem;
