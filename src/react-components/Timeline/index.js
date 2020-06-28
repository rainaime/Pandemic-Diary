import React from "react";
import Colors from "../../site-styles/Colors";
import TimelineDate from "./TimelineDate";
import "./styles.css";

class Timeline extends React.Component {
    flashIfNotInteracted = setInterval(() => {
        this.setState({ hover: !this.state.hover });
    }, 500);

    constructor(props) {
        super(props);

        this.state = {
            start: new Date("December 1 2019"),
            end: new Date("December 31 2020"),
            current: new Date(),
            currentPos: -120,
            hover: true,
            currentPlaced: new Date(),
            canvasSettings: {
                xspace: 12,
                lineWidth: 1,
            },
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
                <span style={{position: 'absolute', transform: 'translateX(-50%)', left: '50%', visibility: this.flashIfNotInteracted ? 'visible' : 'hidden', color: Colors.textColorLight}}>Hover over the timeline to select a date you'd like to view!</span>
                <TimelineDate
                    style={{ visibility: !this.state.hover && !this.flashIfNotInteracted ? "hidden" : "visible" }}
                    date={this.state.current}
                    xpos={this.state.currentPos}
                    state={this.props.state}
                />
                <canvas
                    ref={this.canvasRef}
                    className="timeline"
                    onMouseMove={this.handleMouseOver.bind(this)}
                    onClick={this.handleClick.bind(this)}
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
        const settings = this.state.canvasSettings;

        ctx.canvas.width = window.innerWidth;

        ctx.strokeStyle = Colors.backgroundLightAccent;
        ctx.lineCap = "round";
        ctx.lineWidth = 0.2;
        for (let i = 0; i < ctx.canvas.width; i += settings.xspace) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, ctx.canvas.height);
            ctx.closePath();
            ctx.stroke();
        }
        ctx.beginPath();
        ctx.moveTo(0, ctx.canvas.height / 2);
        ctx.lineTo(ctx.canvas.width, ctx.canvas.height / 2);
        ctx.closePath();
        ctx.stroke();
    };

    updateCurrent(xpos) {
        const ctx = this.canvasRef.current.getContext("2d");
        const daysBetween = Math.round(
            Math.abs((this.state.end - this.state.start) / (24 * 60 * 60 * 1000))
        );

        const tempDate = new Date(this.state.start);
        tempDate.setDate(this.state.start.getDate() + (xpos / ctx.canvas.width) * daysBetween);
        this.setState({
            current: tempDate,
            currentPos: xpos - 50,
        });

        this.props.updateCurrentDate(this.state.current);

        ctx.strokeStyle = Colors.textAccent1;
        ctx.lineWidth = 5;

        ctx.beginPath();
        ctx.moveTo(xpos, 0);
        ctx.lineTo(xpos, ctx.canvas.height);
        ctx.closePath();
        ctx.stroke();
    }

    handleClick() {
        this.setState({ currentPlaced: this.state.current });
    }

    handleMouseOver(e) {
        clearInterval(this.flashIfNotInteracted)
        this.flashIfNotInteracted = false;
        const ctx = this.canvasRef.current.getContext("2d");
        let x = e.clientX - e.target.getBoundingClientRect().left;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        this.initializeCanvas();
        this.updateCurrent(x);
    }
}

export default Timeline;
