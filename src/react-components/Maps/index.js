import React from "react";
import ScrollContainer from 'react-indiana-drag-scroll';

import "./styles.css";
// import Marker from "./Marker";

const markerDimensions = {
    width: 16,
    height: 26
}
class Maps extends React.Component {
    constructor(props) {
        super(props);

        this.canvasRef = React.createRef();

        this.state = {
            markers: [
                {x : 220, y: 220, content: "marker 1"},
                {x: 100, y: 50, content: "hello marker 2"},
                {x : 200, y: 200, content: "marker 3"},
                {x: 300, y:1000, content: "hehe"}
            ],
        }
        this.update = false;
    }

    getMarkerAtLocation(e) {
        const imgRect = this.canvasRef.current.getBoundingClientRect();
        const adjX = e.pageX - imgRect.x;
        const adjY = e.pageY - imgRect.y
        for (const marker of this.state.markers) {
            if (marker.x <= adjX && adjX <= marker.x + markerDimensions.width &&
                marker.y <= adjY && adjY <= marker.y + markerDimensions.height) {
                return marker;
            }
        }
    }

    //current issues: 
    //doesnt allow you to click on same spot because youre clicking marker img instead of the actual map image now
    handleClick(e) {
        const marker = this.getMarkerAtLocation(e);

        // TODO: Make this actually do something by passing the appropriate parameters.
        if (!marker && this.props.handler) {
            const imgRect = this.canvasRef.current.getBoundingClientRect();
            const adjX = e.pageX - imgRect.x;
            const adjY = e.pageY - imgRect.y;
            this.setState((prev) => ({
                markers: [...prev.markers, {
                    x: adjX,
                    y: adjY,
                    content: 'marker ' + this.state.markers.length
                }]
            }), this.props.handleContentAdd);
        }
    }

    componentDidMount() {
        const ctx = this.canvasRef.current.getContext('2d');
        const img = new Image()
        const markerImg = new Image();
        img.onload = () => {
            ctx.drawImage(img, 0, 0);
            this.state.markers.forEach((marker) => {ctx.drawImage(markerImg, marker.x, marker.y, markerDimensions.width, markerDimensions.height)});
        };
        img.src = '/map.png'
        markerImg.src = '/marker.png';
    }

    componentDidUpdate(prevProps, prevState) {
        const ctx = this.canvasRef.current.getContext('2d');
        const markerImg = new Image();
        const lastMarker = this.state.markers[this.state.markers.length-1];
        markerImg.onload = () => {
            ctx.drawImage(markerImg, lastMarker.x, lastMarker.y, markerDimensions.width, markerDimensions.height)
        };
        markerImg.src = '/marker.png';
    }

    render() {
        return (
            <ScrollContainer className="scroll-container">
                <canvas ref={this.canvasRef}
                onClick={this.handleClick.bind(this)}
                    onMouseMove={(e) => {
                    const marker = this.getMarkerAtLocation(e);
                        if (!marker) {
                            return;
                        } else {
                            console.log(this)
                            this.props.mm.x = marker.x;
                            this.props.mm.y = marker.y;
                            this.props.mm.txt = marker.content;
                        }
                    }}
                width={3740}
                height={1700}
                alt='Temporary map for Phase 1.'/>
            {/*<img ref={this.imgRef} 
                onClick={this.handleClick.bind(this)} 
                src={mapImg}
                alt='Temporary map for Phase 1.'/>*/}
            {/* this will let markers be pushed */}
            {/* {this.state.markers.map( (marker) => (<Marker x={marker.x} y={marker.y} content={marker.content}/>))} */}
            </ScrollContainer>
            

        );
    };
}

export default Maps;
