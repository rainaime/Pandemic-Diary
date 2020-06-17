import React from "react";
import TimelineDate from "./TimelineDate";
import './styles.css';

class Timeline extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            start: new Date("December 1 2019"),
            end: new Date("December 31 2020"),
            current: new Date(),
            currentPos: -120,
            placed: true, 
            canvasSettings: {
                xspace: 7,
                lineWidth: 1,
            }
        }
    }

    render() {
        /*return (
            <div>
                <TimelineDate 
                    date={this.state.start} 
                    xpos={30}
                />
                <TimelineDate 
                    date={this.state.current} 
                    xpos={this.state.currentPos}
                />
                <TimelineDate 
                    date={this.state.end} 
                    xpos={window.innerWidth - 120}
                />
                <canvas
                ref="timeline"
                className="timeline"
                onMouseMove={this.handleMouseOver.bind(this)}
                onClick={this.handleClick}
                />
            </div>
        );*/
        return (
            <div>
                <TimelineDate 
                    date={this.state.current} 
                    xpos={this.state.currentPos}
                />
                <canvas
                ref="timeline"
                className="timeline"
                onMouseMove={this.handleMouseOver.bind(this)}
                onClick={this.handleClick}
                />
            </div>
        );
    }

    updateDimensions = () => {
        this.initializeCanvas();
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
        this.initializeCanvas();
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    updateCanvas = () => {
        this.initializeCanvas();
    }

    // Draw an empty canvas with only the bar on it.
    initializeCanvas = () => {
        const ctx = this.refs.timeline.getContext("2d");
        const settings = this.state.canvasSettings;

        ctx.canvas.width = window.outerWidth;

        ctx.strokeStyle = "#FF0000";
        for (let i = 0; i < ctx.canvas.width; i += settings.xspace) {
            ctx.fillRect(i, 0, 0.5, ctx.canvas.height);
        }
        ctx.fillRect(0, ctx.canvas.height/2, ctx.canvas.width, 5);
    }

    updateCurrent(xpos) {
        const ctx = this.refs.timeline.getContext("2d");
        const daysBetween = Math.round(Math.abs((this.state.end - this.state.start) / (24*60*60*1000)));

        const tempDate = new Date(this.state.start);
        tempDate.setDate(this.state.current.getDate() + (xpos/ctx.canvas.width)*daysBetween);
        this.setState({
            current: tempDate,
            currentPos: xpos - 50 
        });

        ctx.fillStyle="#FF0000";
        ctx.fillRect(xpos, 0, 3, ctx.canvas.height);
    }

    handleClick() {
        console.log("clicked!");
    }

    handleMouseOver(e) {
        const ctx = this.refs.timeline.getContext("2d");

        let x = e.clientX - e.target.getBoundingClientRect().left;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        this.initializeCanvas();
        this.updateCurrent(x);
    }
}

export default Timeline;
