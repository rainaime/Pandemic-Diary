import React from "react";
import Colors from '../../site-styles/Colors';
import './styles.css';

class CollapseButton extends React.Component {
    state = {
        hover: false,
    }
    render() {
        const buttonStyle = {
            left: 'calc(100% - 6px)',
            transform: 'none',
            backgroundColor: Colors.backgroundDarkAccent,
            color: this.state.hover ? Colors.textAccent1 : Colors.textColorLight
        };

        if (this.props.position === "left") {
            buttonStyle.left = '-6px';
            if (this.props.collapsed) {
                buttonStyle.transform = 'scaleX(-1)';
                buttonStyle.left = 'calc(100% - 12px)';
            }
        } else {
            if (!this.props.collapsed) {
                buttonStyle.transform = 'scaleX(-1)';
            } else {
                buttonStyle.transform = 'none';
                buttonStyle.left = 'calc(100%)';
            }
        }

        return (
            <div onClick={this.props.onClick} 
                className="collapse-button" 
                style={buttonStyle}
                onMouseEnter={() => this.setState({hover: true})}
                onMouseLeave={() => this.setState({hover: false})}>
                &#x276D;
            </div>
        );
    };
}

export default CollapseButton;
