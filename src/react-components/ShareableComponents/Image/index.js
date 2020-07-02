import React from "react";
import "./style.css";

class ImageIcon extends React.Component {
    Image = {
        type: "image",
        img: new Image(),
        width: 16,
        height: 24,
        content: <img alt=""></img>,
        date: this.props.date,
        dateText: '',
        updateDate: this.updateDate,
    };

    componentWillUnmount() {
        Image.img = undefined;
    }

    updateDate(date) {
        this.date = date
    }

    render() {
        const marker = (
            <img
                alt="_image"
                style={this.props.style}
                src="/image.png"
                onClick={() => {
                    this.props.onClick(this.Image);
                }}
            />
        );
        const img = this.Image.img;
        if (img.src) {
            return marker;
        } else {
            if (!img.complete) {
                img.onload = () => {
                    img.src = "/happy_face.png";
                    return marker;
                };
            } else {
                img.src = "happy_face.png";
                return marker;
            }
        }
    }
}

class ImageMenu extends React.Component {
    submitImage(e) {
        //TODO this seems like a messy implementation the content probably should not be an img but the default was placed as an img object so idk
        //need to check that the file being passed is actually an image file - appears that photo just wont show if wrong file but still
        const imgUrl = URL.createObjectURL(e.target.files[0]);
        this.props.image.content = <img style={{maxWidth: '90%', maxHeight: '90%'}} src={imgUrl} alt=""/>
    }

    render() {
        return (
            <div style={{ textAlign: "left" }}>
                <h1>Image Selector</h1>
                <p>
                    Select an image to add to this image marker you've placed. It will be displayed
                    when you hover over the marker.
                </p>
                <form action="image upload">
                    <input
                        type="file"
                        name="fileupload"
                        id="fileupload"
                        onChange={this.submitImage.bind(this)
                        }
                    />
                </form>
                <div className="dateSection">
                    <input type="date" value={this.props.image.dateText} min="2019-12-01" max="2020-12-31"
                    onChange={(e) => {
                        // this.setState({value: e.target.valueAsDate});
                        this.props.image.dateText = e.target.value;
                        this.setState({value: e.target.value});
                        this.props.updateDate(e.target.valueAsDate);
                        this.props.updateCurrentDate(e.target.valueAsDate);
                    }}/>
                </div>

                <div className="articleType">
                <select name="article" id="cars" onChange={(e) => {
                        // this.setState({value: e.target.value});
                        this.props.updateArticleType(e.target.value);
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

export { ImageIcon, ImageMenu };
