import React from 'react';

class ImageIcon extends React.Component {
    Image = {
        type: 'image',
        img: new Image(),
        width: 16,
        height: 24,
        content: 'todo: pop up file explorer window to choose image'
    }

    render () {
        const marker = (
            <img style={this.props.style} src='/image.png' onClick={() => {this.props.onClick(
                this.Image
            )}}/>);
        if (!this.Image.img.complete) {
            this.Image.img.onload = () => {
                this.Image.img.src = '/happy_face.png';
                return marker;
            };
        } else {
            this.Image.img.src = '/happy_face.png';
            return marker;
        }
    }
}

export default ImageIcon;
