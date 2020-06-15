import React from "react";
import './styles.css';

class Timeline extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            start: new Date("December 1 2019"),
            end: new Date("December 31 2020"),
            current: new Date(),
            hover: true,
            canvasSettings: {
                xspace: 10,
                lineWidth: 1,
            }
        }
    }

    render() {
        return (
            <canvas
            ref="timeline"
            className="timeline"
            onMouseMove={this.handleMouseOver.bind(this)}
            onClick={this.handleClick}
            />
        );
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
        this.initializeCanvas();
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updatedimensions);
    }

    updateCanvas = () => {
        this.initializeCanvas();
    }

    // Draw an empty canvas with only the bar on it.
    initializeCanvas = () => {
        const ctx = this.refs.timeline.getContext("2d");
        const settings = this.state.canvasSettings;

        ctx.canvas.width = window.innerWidth;

        ctx.strokeStyle = "#FF0000";
        for (let i = 0; i < ctx.canvas.width; i += settings.xspace) {
            ctx.fillRect(i, 0, 0.5, ctx.canvas.height);
        }
        console.log(ctx.canvas.height/2);
        ctx.fillRect(0, ctx.canvas.height/2, ctx.canvas.width, 5);
    }

    updateCurrent(xpos) {
        const ctx = this.refs.timeline.getContext("2d");
        const settings = this.state.canvasSettings;

        const daysBetween = Math.round(Math.abs((this.state.end - this.state.start) / (24*60*60*1000)));

        ctx.fillStyle="#FF0000";
        ctx.fillRect(xpos, 0, 2, ctx.canvas.height);
    }

    handleClick() {
        console.log("clicked!");
    }

    handleMouseOver(e) {
        const ctx = this.refs.timeline.getContext("2d");
        const settings = this.state.canvasSettings;
        // Logic to calculate the target date.
        let x = e.screenX;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        this.initializeCanvas();
        this.updateCurrent(x);
    }
}

export default Timeline;
