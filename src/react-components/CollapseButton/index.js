import React from "react";
import './styles.css';

class CollapseButton extends React.Component {
    render() {
        const orientationStyle = {
            left: 'calc(100% - 6px)',
            transform: 'none'
        };

        if (this.props.position === "left") {
            orientationStyle.left = '-6px';
            if (this.props.collapsed) {
                orientationStyle.transform = 'scaleX(-1)';
                orientationStyle.left = 'calc(100% - 12px)';
            }
        } else {
            if (!this.props.collapsed) {
                orientationStyle.transform = 'scaleX(-1)';
            } else {
                orientationStyle.transform = 'none';
                orientationStyle.left = 'calc(100%)';
            }
        }

        return (
            <div onClick={this.props.onClick} className="collapse-button" style={orientationStyle}>&#x276D;</div>
        );
    };
}

export default CollapseButton;
