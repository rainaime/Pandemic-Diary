import React from "react";
import ScrollContainer from "react-indiana-drag-scroll";

import "./styles.css";

const markerDimensions = {
    width: 16,
    height: 26,
};
class Maps extends React.Component {
    constructor(props) {
        super(props);

        this.canvasRef = React.createRef();

    }

    getShareableAtLocation(e) {
        const imgRect = this.canvasRef.current.getBoundingClientRect();
        const adjX = e.pageX - imgRect.x;
        const adjY = e.pageY - imgRect.y;
        for (const marker of this.props.shareables) {
            if (
                marker.x <= adjX &&
                adjX <= marker.x + markerDimensions.width &&
                marker.y <= adjY &&
                adjY <= marker.y + markerDimensions.height
            ) {
                return marker;
            }
        }
    }

    handleClick(e) {
        const shareable = this.getShareableAtLocation(e);
        
        if (!shareable && this.props.inAddMode) {
            const imgRect = this.canvasRef.current.getBoundingClientRect();
            const n = Object.assign({}, this.props.currentShareable);
            n.x = e.pageX - imgRect.x;
            n.y = e.pageY - imgRect.y;
            n.user = null;
            n.selectedType = this.props.selectedType;
            console.log(this.props.currentDate)
            n.date = this.props.currentDate;
            this.props.addToShareableArray(n);
            this.props.onShareablePlaced(n.type);
        }
    }

    componentDidMount() {
        // this.drawMap();
    }

    drawMap() {
        const ctx = this.canvasRef.current.getContext("2d");
        const map = new Image();
        map.onload = () => {
            ctx.drawImage(map, 0, 0);
        };
        map.src = "/map.png";
    }

    clearMap() {
        const ctx = this.canvasRef.current.getContext("2d");
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }
    
    drawMarkers(shareables) {
        const ctx = this.canvasRef.current.getContext("2d");
        for (let s of this.props.shareables) {
            // TODO: Once selectedType is implemented, replace the condition
            // if (s.date.getDate() === this.props.currentDate.getDate() && s.type === this.props.selectedType){
            if (s.date.getFullYear() === this.props.currentDate.getFullYear()
            && s.date.getMonth() === this.props.currentDate.getMonth()
            && s.date.getDate() === this.props.currentDate.getDate()){ 
                //getDate() only returns the day value
    
                const draw = () => {ctx.drawImage(s.img, s.x, s.y, s.width, s.height)}
                if (!s.img.complete) {
                    s.img.onload = () => {
                        draw();
                    }
                } else {
                    draw();
                }
            }
        }
    }

    componentDidUpdate(prevProps, prevState) {
        // -------------------------------------------------------------------------------- 
        // TODO: Avoid unneeded canvas rendering by checking the previous props and state.|
        // --------------------------------------------------------------------------------
        // const shareable = this.props.shareables[this.props.shareables.length - 1];
        // if (prevProps.shareables.length > this.props.shareables.length) {
        //     this.clearMap();
        //     this.drawMarkers(this.props.shareables);
        // } else if (!shareable || prevProps.shareables.length === this.props.shareables.length) {
        //     return;
        // } else {
        //     this.drawMarkers([this.props.shareables[this.props.shareables.length - 1]]);
        // }
        this.clearMap();
        this.drawMarkers(this.props.shareables);
    }


    render() {
        return (
            <ScrollContainer className="scroll-container">
                {this.props.children}
                <canvas
                    ref={this.canvasRef}
                    onClick={this.handleClick.bind(this)}
                    onMouseMove={(e) => {
                        const shareable = this.getShareableAtLocation(e);
                        if (!shareable) {
                            return;
                        } else {
                            this.props.updateSelectedShareable(shareable);
                        }
                    }}
                    style={{
                        zIndex: 1,
                        position: 'absolute',
                        top: 0,
                        left: 0
                    }}
                    width={3740}
                    height={1700}
                >
                </canvas>
                <img alt="Temporary map for phase 1." style={{
                    zIndex: 0,
                    position: 'absolute',
                    top: 0,
                    left: 0
                }} src='/map.png' width={3740} height={1700}/>
            </ScrollContainer>
        );
    }
}

export default Maps;
