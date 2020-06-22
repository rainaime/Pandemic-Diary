import React from "react";
import "./styles.css";

class TimelineDate extends React.Component {
    render() {
        const xpos = this.props.xpos;
        return (
            <span style={{
                top: 'calc(100% - 75px)',
                left: xpos,
                position: 'fixed',
                display: 'inline',
                width: 100,
                backgroundColor: 'white'
            }}>
            { this.props.date.toDateString() }
            </span>
        );
    }
}

export default TimelineDate;
