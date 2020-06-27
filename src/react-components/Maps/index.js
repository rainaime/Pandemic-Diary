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
        const ctx = this.canvasRef.current.getContext("2d");
        const map = new Image();
        map.onload = () => {
            ctx.drawImage(map, 0, 0);
        };
        map.src = "/map.png";

    }

    componentDidUpdate(prevProps, prevState) {
        const ctx = this.canvasRef.current.getContext("2d");
        const shareable = this.props.shareables[this.props.shareables.length - 1];
        if (!shareable || prevProps.shareables.length === this.props.shareables.length) {
            return;
        }
        const draw = () => {ctx.drawImage(shareable.img, shareable.x, shareable.y, shareable.width, shareable.height)}
        if (!shareable.img.complete) {
            shareable.img.onload = () => {
                draw();
            }
        } else {
            draw();
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
                    width={3740}
                    height={1700}
                    alt="Temporary map for Phase 1."
                />
            </ScrollContainer>
        );
    }
}

export default Maps;
