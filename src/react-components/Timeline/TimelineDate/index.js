import React from "react";

class TimelineDate extends React.Component {
    render() {
        return (
            <span style={{...this.props.style,
                top: 'calc(100% - 70px)',
                left: this.props.xpos,
                position: 'fixed',
                display: 'inline',
                width: 100,
                borderRadius: '5px'
            }}>
            { this.props.date.toDateString() }
            </span>
        );
    }
}

export default TimelineDate;
