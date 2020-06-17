import React from "react";
import "./styles.css";

class TimelineDate extends React.Component {
    render() {
        const xpos = this.props.xpos;
        console.log(this.props.date.toDateString())
        return (
            <span style={{
                top: 'calc(100vh - 90px)',
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
