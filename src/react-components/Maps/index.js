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
            <img ref={this.imgRef} 
                onClick={this.handleClick.bind(this)} 
                src={mapImg}
                alt='Temporary map for Phase 1.'/>
            </ScrollContainer>
        );
    };
}

export default Maps;
