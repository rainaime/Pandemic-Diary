import React from "react";
import "./style.css";

class MarkerIcon extends React.Component {
    state = {
        type: "marker",
        img: new Image(),
        width: 16,
        height: 24,
        content: "todo: allow user to change text of these markers",
        month: 'Jan',
        week: 'Mon',
        day: '1',
        year: '2019',
        id: '',
    };

    componentWillUnmount() {
        Image.img = undefined;
    }

    render() {
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
                <input
                    type="text"
                    maxLength="100"
                    width="100%"
                    onChange={(e) => {
                        console.log(this.props.state)
                        this.props.state.content = e.target.value
                    }}
                />

                <div className="dateSection">
                    <select onChange={(e) => {
                        this.props.state.week = e.target.value
                    }}>
                        <option value="Mon">Mon</option>
                        <option value="Tue">Tue</option>
                        <option value="Wed">Wed</option>
                        <option value="Thu">Thu</option>
                        <option value="Fri">Fri</option>
                        <option value="Sat">Sat</option>
                        <option value="Sun">Sun</option>
                    </select>

                    <select onChange={(e) => {
                        this.props.state.month = e.target.value
                    }}>
                        <option value="Jan">Jan</option>
                        <option value="Feb">Feb</option>
                        <option value="Mar">Mar</option>
                        <option value="Apr">Apr</option>
                        <option value="May">May</option>
                        <option value="Jun">Jun</option>
                        <option value="Jul">Jul</option>
                        <option value="Aug">Aug</option>
                        <option value="Sep">Sep</option>
                        <option value="Oct">Oct</option>
                        <option value="Nov">Nov</option>
                        <option value="Dec">Dec</option>
                    </select>

                    <select onChange={(e) => {
                        this.props.state.day = e.target.value
                    }}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                        <option value="16">16</option>
                        <option value="17">17</option>
                        <option value="18">18</option>
                        <option value="19">19</option>
                        <option value="20">20</option>
                        <option value="21">21</option>
                        <option value="22">22</option>
                        <option value="23">23</option>
                        <option value="24">24</option>
                        <option value="25">25</option>
                        <option value="26">26</option>
                        <option value="27">27</option>
                        <option value="28">28</option>
                        <option value="29">29</option>
                        <option value="30">30</option>
                        <option value="31">31</option>
                    </select>

                    <select onChange={(e) => {
                        console.log(this.props.state)
                        this.props.state.year = e.target.value
                    }}>
                        <option value="2019">2019</option>
                        <option value="2020">2020</option>
                    </select>
                </div>
            </div>
        );
    }
}

export { MarkerIcon, MarkerMenu };
