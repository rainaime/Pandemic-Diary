import React from "react";

class ImageIcon extends React.Component {
    Image = {
        type: "image",
        img: new Image(),
        width: 16,
        height: 24,
        content: <img alt=""></img>
    };

    componentWillUnmount() {
        Image.img = undefined;
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
    render() {
        return (
            <div style={{textAlign: 'left'}}>
                <h1>Image Selector</h1>
                <p>
                    Select an image to add to this image marker you've placed. It will be displayed
                    when you hover over the marker.
                </p>
                <ul>
                    <li>
                        Upload from your computer: <span style={{backgroundColor: 'red'}}>figure out how to do this dynamically, probably need to move Image in Marker to state</span>
                    </li>
                </ul>
            </div>
        );
    }
}

export { ImageIcon, ImageMenu };
