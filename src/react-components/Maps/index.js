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
        this.markRef = React.createRef();

        this.state = {
            markers: [
                {x : 220, y: 220, content: "marker 1"},
                {x: 100, y: 50, content: "hello marker 2"},
                {x : 200, y: 200, content: "marker 3"},
                {x: 300, y:1000, content: "hehe"}
            ],
            update: '' //need to fix this it is a janky way to update state
        }
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
        console.log(marker.content);
    }

    componentDidMount() {
        const ctx = this.canvasRef.current.getContext('2d');
        const img = new Image();
        const markerImg = new Image();
        img.onload = () => {
            ctx.drawImage(img, 0, 0)
            this.state.markers.forEach((marker, i) => {ctx.drawImage(markerImg, marker.x, marker.y, markerDimensions.width, markerDimensions.height)});
        };
        img.src = '/map.png'
        markerImg.src = '/marker.png';
    }

    render() {
        let popUp;
        if (this.props.state.articlePopUp == 1) {
            popUp = <div className = "articlePopUp">
                <strong className="strongg">{this.props.state.articleToSend.text}</strong>
            </div>
        }
        return (
            <ScrollContainer className="scroll-container">
            {popUp}
                <canvas ref={this.canvasRef}
                onClick={this.handleClick.bind(this)}
                width={3740}
                height={1700}
                alt='Tempory map for Phase 1.'/>
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

const markerStyle = {
    position: "absolute",
    left: "100px",
    height: "2vh",
    width: "2vw"
}

export default Maps;
