import React from "react";
import "./style.css";

class ImageIcon extends React.Component {
    Image = {
        type: "image",
        height: 24,
        width: 24,
        img: new Image(),
        content: <img alt=""></img>,
        date: this.props.date,
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
        const marker = (
            <img
                alt="_image"
                style={{...this.props.style, height: 20, width: 20}}
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
        //initially created then the default selectedType is News
        if(this.props.image.selectedType == null){
            this.props.updateArticleType("News");
        }

        return (
            <>
                <h1 className="popupBox_title">Image Selector</h1>
                <p className="popupBox_instructions">
                    Select an image to add to this image marker you've placed. It will be displayed
                    when you hover over the marker.
                </p>
                <form action="image upload">
                    <input
                        type="file"
                        accept="image/*"
                        name="fileupload"
                        id="fileupload"
                        onChange={this.submitImage.bind(this)
                        }
                    />
                </form>
                <div className="dateSection">
                    <input type="date" value={this.props.image.dateText} min="2019-12-01" max="2020-12-31"
                    onChange={(e) => {
                        this.props.image.dateText = e.target.value;
                        this.setState({value: e.target.value});
                        this.props.updateDate(e.target.valueAsDate);
                        this.props.updateCurrentDate(e.target.valueAsDate);
                    }}/>
                </div>

                <div className="articleType">
                <select name="article" value={this.props.image.selectedType} onChange={(e) => {
                        this.props.updateArticleType(e.target.value);
                        this.setState({value: e.target.value});
                    }}>
                    <option value="News">News</option>
                    <option value="Vacation">Vacation</option>
                    <option value="Other Stuff">Other Stuff</option>
                </select>
                </div>
            </>
        );
    }
}

export { ImageIcon, ImageMenu };
