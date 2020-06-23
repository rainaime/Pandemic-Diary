import React from "react";
import ScrollContainer from 'react-indiana-drag-scroll';

import mapImg from './map.png';
import "./styles.css";

class Maps extends React.Component {
    constructor(props) {
        super(props);

        this.imgRef = React.createRef();
    }

    handleClick(e) {
        const imgRect = this.imgRef.current.getBoundingClientRect();
        console.log(e.pageX - imgRect.x, e.pageY - imgRect.y)
    }

    render() {
        return (
            <ScrollContainer className="scroll-container">
            <img ref={this.imgRef} onClick={this.handleClick.bind(this)} src={mapImg}/>
            </ScrollContainer>
        );
    };
}

export default Maps;
