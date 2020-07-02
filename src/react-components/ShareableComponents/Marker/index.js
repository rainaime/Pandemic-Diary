import React from "react";
import "./style.css";

class MarkerIcon extends React.Component {
    state = {
        type: "marker",
        width: 20,
        height: 30,
        img: new Image(),
        content: "",
        date: this.props.date, //do we need this here
        id: '',
        dateText: '',
        selectedType: '',

        updateSelectedType: this.updateSelectedType,
        updateDate: this.updateDate,
    };

    componentWillUnmount() {
        Image.img = undefined;
    }

    updateDate(date) {
        this.date = date
    }

    updateSelectedType(type) {
        this.selectedType = type;
    }

    render() {
        this.updateDate.bind(this);
        this.updateSelectedType.bind(this);

        const marker = (
            <img
                style={{...this.props.style, width: 16, height: 24}}
                src="/marker.png"
                alt="marker"
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
        //initially created then the default selectedType is News
        if(this.props.state.selectedType == null){
            this.props.updateArticleType("News");
        }
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
                    onKeyPress= {(event) => {
                        if (event.key === "Enter"){
                            this.props.enterPressed()
                        }
                    }}
                />

                <div className="dateSection">
                    <input type="date" value={this.props.state.dateText} min="2019-12-01" max="2020-12-31"
                    onChange={(e) => {
                        // this.setState({value: e.target.valueAsDate});
                        this.props.state.dateText = e.target.value;
                        // this.setState({value: e.target.value});
                        this.props.updateDate(e.target.valueAsDate);
                        this.props.updateCurrentDate(e.target.valueAsDate);
                        this.setState({value: e.target.value});
                        //TODO old
                    // <input type="date" defaultValue="2019-01-01" min="2019-01-01" max="2020-12-31"
                    // onChange={(e) => {
                    //     this.setState({date: new Date(e.target.value)});
                    //     this.props.state.date = new Date(e.target.value);
                    //     //this only adjusts the year-month-date
                    }}/>
                </div>
                <div className="articleType">
                <select name="article" value={this.props.state.selectedType} onChange={(e) => {
                        this.props.updateArticleType(e.target.value);
                        this.setState({value: e.target.value});
                    }}>
                    <option value="News">News</option>
                    <option value="Vacation">Vacation</option>
                    <option value="Other Stuff">Other Stuff</option>
                </select>
                </div>
            </div>
        );
    }
}

export { MarkerIcon, MarkerMenu };
