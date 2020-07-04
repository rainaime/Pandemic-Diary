import React from "react";
import "./style.css";

/**
 * Image for user to display on the map
 *
 * Props: 
 * - date: date on the map
 * - onClick: function to set mode to add this marker
 */
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

    //set image to undefined when first mounted
    componentWillUnmount() {
        Image.img = undefined;
    }

    //update date of image
    updateDate(date) {
        this.date = date
    }

    //update selected type of image
    updateSelectedType(type) {
        this.selectedType = type;
    }

    render() {
        const marker = (
            <img
                className="popoutButton-children"
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

/**
 * A popup to change image, type and date
 *
 * Props: 
 * - image: currently selected image
 * - updateDate: function to update the date of the image to the currently selected date
 * - updateArticleType: function to update shareable's type
 * - shareableDate: date of the shareable
 * - updateCurrentDate: function to update current date
 */
class ImageMenu extends React.Component {
    inputRef = React.createRef();

    componentDidUpdate() {
        if (this.props.shouldClear) {
            this.inputRef.current.value = "";
            this.props.onPopupExit();
        }
    }

    submitImage(e) {
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
                        ref={this.inputRef}
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
