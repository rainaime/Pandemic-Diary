import React from "react";
import Colors from "../../site-styles/Colors";
import TimelineDate from "./TimelineDate";
import "./styles.css";

const canvasSettings = {
    xspace: 12,
    lineWidth: 0.2,
};

class Timeline extends React.Component {
    flashIfNotInteracted = setInterval(() => {
        this.setState({ hover: !this.state.hover });
    }, 500);

    constructor(props) {
        super(props);

        this.state = {
            currentPos: -120,
            mouseDown: false,
            hover: true,
        };
        this.canvasRef = React.createRef();
    }

    render() {
        return (
            <div
                style={{
                    height: "20px",
                    backgroundColor: !this.state.hover
                        ? Colors.background
                        : Colors.backgroundDarkAccent,
                    transition: "all 0.3s",
                }}>
                <span
                    style={{
                        position: "absolute",
                        transform: "translateX(-50%)",
                        left: "50%",
                        visibility: this.flashIfNotInteracted ? "visible" : "hidden",
                        color: Colors.textColorLight,
                    }}>
                    To interact with the timeline, click and hold here!
                </span>
                <TimelineDate
                    style={{
                        visibility:
                            !this.state.hover && !this.flashIfNotInteracted ? "hidden" : "visible",
                    }}
                    date={this.props.currentDate}
                    xpos={this.state.currentPos}
                    state={this.props.state}
                />
                <canvas
                    ref={this.canvasRef}
                    className="timeline"
                    onMouseDown={() => this.setState({mouseDown: true})}
                    onMouseUp={() => this.setState({mouseDown: false})}
                    onMouseMove={this.handleMouseOver.bind(this)}
                    onMouseEnter={() => {
                        this.setState({ hover: true });
                    }}
                    onMouseLeave={() => {
                        this.setState({ hover: false });
                    }}
                />
            </div>
        );
    }

    updateDimensions = () => {
        this.initializeCanvas();
    };

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
        this.initializeCanvas();
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    updateCanvas = () => {
        this.initializeCanvas();
    };

    // Draw an empty canvas with only the bar on it.
    initializeCanvas = () => {
        const ctx = this.canvasRef.current.getContext("2d");
        ctx.canvas.width = window.innerWidth;

        ctx.strokeStyle = Colors.backgroundLightAccent;
        ctx.lineCap = "round";
        ctx.lineWidth = canvasSettings.lineWidth;
        for (let i = 0; i < ctx.canvas.width; i += canvasSettings.xspace) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, ctx.canvas.height);
            ctx.closePath();
            ctx.stroke();
        }
    };

    updateCurrent(xpos) {
        const ctx = this.canvasRef.current.getContext("2d");

        ctx.strokeStyle = Colors.textAccent1;
        ctx.lineWidth = 5;

        ctx.beginPath();
        ctx.moveTo(this.state.currentPos+50, 0);
        ctx.lineTo(this.state.currentPos+50, ctx.canvas.height);
        ctx.closePath();
        ctx.stroke();

        if (!this.state.mouseDown && !this.state.flashIfNotInteracted) {
            return;
        }
        const daysBetween = Math.round(
            Math.abs((this.props.maxDate - this.props.minDate) / (24 * 60 * 60 * 1000))
        );

        const tempDate = new Date(this.props.minDate);
        tempDate.setDate(this.props.minDate.getDate() + (xpos / ctx.canvas.width) * daysBetween);
        this.setState({
            currentPos: xpos - 50,
        });

        this.props.updateCurrentDate(tempDate);
    }

    handleMouseOver(e) {
        clearInterval(this.flashIfNotInteracted);
        this.flashIfNotInteracted = false;

        const ctx = this.canvasRef.current.getContext("2d");
        const x = e.clientX - e.target.getBoundingClientRect().left;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        this.initializeCanvas();
        this.updateCurrent(x);
    }
}

export default Timeline;
