import React from "react";
import "./style.css";

class MarkerIcon extends React.Component {
    state = {
        type: "marker",
        img: new Image(),
        width: 16,
        height: 24,
        content: "",
        date: new Date(), 
        id: '',
        updateDate: this.updateDate
    };

    componentWillUnmount() {
        Image.img = undefined;
    }

    updateDate(date) {
        this.date = date
    }

    render() {
        this.updateDate.bind(this);
        const marker = (
            <img
                style={this.props.style}
                src="/marker.png"
                onClick={() => {
                    this.props.onClick(this.state);
                }}
            />
        );
        const img = this.state.img;
        if (img.src) {
            return marker;
        } else {
            if (!img.complete) {
                img.onload = () => {
                    img.src = "/marker.png";
                    return marker;
                };
            } else {
                img.src = "/marker.png";
                return marker;
            }
        }
    }
}

class MarkerMenu extends React.Component {

    render() {
        return (
            <div className ="addContext">
                <h1>Edit your marker!</h1>
                <p>
                    You may enter text you'd like your marker to display here. There is a limit of
                    100 characters.
                </p>
                <textarea
                    value={this.props.state.content}
                    id="textArea"
                    className="text_area"
                    type="text"
                    maxLength="100"
                    onChange={(e) => {
                        this.setState({value: e.target.value});
                        this.props.state.content = e.target.value
                    }}
                />

                <div className="dateSection">
                    <input type="date" DefaultValue="2019-12-01" min="2019-12-01" max="2020-12-31"
                    onChange={(e) => {
                        this.setState({value: e.target.valueAsDate});
                        this.props.updateDate(e.target.valueAsDate);
                    }}/>
                </div>
            </div>
        );
    }
}

export { MarkerIcon, MarkerMenu };
