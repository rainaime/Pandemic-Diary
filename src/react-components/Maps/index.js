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

    componentDidUpdate(prevProps, prevState) {
        const ctx = this.canvasRef.current.getContext("2d");
        const shareable = this.props.shareables[this.props.shareables.length - 1];
        console.log(shareable, prevProps.shareables.length, this.props.shareables.length);
        if (prevProps.shareables.length > this.props.shareables.length) {
            this.clearMap();
            // this.drawMap();
            this.drawMarkers(this.props.shareables);
        } else if (!shareable || prevProps.shareables.length === this.props.shareables.length) {
            return;
        } else {
            this.drawMarkers([this.props.shareables[this.props.shareables.length - 1]]);
        }
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
                    alt="Temporary map for Phase 1."
                >
                </canvas>
                <img style={{
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
