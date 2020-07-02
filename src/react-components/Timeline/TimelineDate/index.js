import React from "react";
import Colors from '../../../site-styles/Colors';

class TimelineDate extends React.Component {
    render() {
        return (
            <span style={{...this.props.style,
                top: 'calc(100% - 60px)',
                left: this.props.xpos,
                position: 'fixed',
                display: 'inline',
                width: 100,
                borderRadius: '5px',
                backgroundColor: Colors.backgroundDarkAccent,
                color: Colors.textColorLight,
                userSelect: 'none',
                zIndex: 20,
            }}>
            {this.props.date.toDateString()}
            </span>
        );
    }
}

export default TimelineDate; 
