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
                color: '#1D3557',
                backgroundColor: '#F1FAEE',
                border: '1px solid #1D3557',
                borderRadius: '5px'
            }}>
            { this.props.date.toDateString() }
            </span>
        );
    }
}

export default TimelineDate;
