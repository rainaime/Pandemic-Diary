import React from "react";
import ScrollContainer from 'react-indiana-drag-scroll';

import mapImg from './map.png';
import markerImg from './marker.png';

import "./styles.css";
import Marker from "./Marker";

class Maps extends React.Component {
    constructor(props) {
        super(props);

        this.imgRef = React.createRef();
        this.markRef = React.createRef();

        this.state = {
            markers: [
                {x : 220, y: 220, content: "marker 1"},
                {x: 100, y: 50, content: "hello marker 2"},
                {x : 200, y: 200, content: "marker 3"}
            ],
            update: '' //need to fix this it is a janky way to update state
        }
    }

    //current issues: 
    //doesnt allow you to click on same spot because youre clicking marker img instead of the actual map image now
    handleClick(e) {
        const imgRect = this.imgRef.current.getBoundingClientRect();
        // this.state.markers.push({x: e.pageX - imgRect.x, y: e.pageY - imgRect.y, content: "placeholder content"})
        this.state.markers.push({x: e.clientX - imgRect.left, y: e.clientY - imgRect.top, content: "placeholder content"})
        this.setState({update: '1'})

    }

    render() {
        return (
            <ScrollContainer className="scroll-container">
            <img ref={this.imgRef} 
                onClick={this.handleClick.bind(this)} 
                src={mapImg}
                alt='Temporary map for Phase 1.'/>
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
