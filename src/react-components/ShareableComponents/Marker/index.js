import React from "react";

class MarkerIcon extends React.Component {
    Marker = {
        type: "marker",
        img: new Image(),
        width: 16,
        height: 24,
        content: 'todo: allow user to change text of these markers'
    };

    componentWillUnmount() {
        Image.img = undefined;
    }

    render () {
        const marker = (
            <img style={this.props.style} src='/marker.png' onClick={() => {
                this.props.onClick(this.Marker, 'marker');
            }}/>);
        const img = this.Marker.img;
        if (img.src) {
            return marker;
        } else {
            if (!img.complete) {
                img.onload = () => {
                    img.src = '/marker.png';
                    return marker;
                }
            } else {
                img.src = '/marker.png';
                return marker;
            }
        }
    }
}

export default MarkerIcon;
