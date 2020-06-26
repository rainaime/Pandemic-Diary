import React from "react";

class MarkerIcon extends React.Component {
    Marker = {
        type: "marker",
        img: new Image(),
        width: 16,
        height: 24,
        content: 'todo: allow user to change text of these markers'
    };

    render () {
        const marker = (
            <img style={this.props.style} src='/marker.png' onClick={() => {this.props.onClick(
                this.Marker
            )}}/>);
        if (!this.Marker.img.complete) {
            this.Marker.img.onload = () => {
                this.Marker.img.src = '/marker.png';
                return marker;
            };
        } else {
            this.Marker.img.src = '/marker.png';
            return marker;
        }
    }
}

export default MarkerIcon;
