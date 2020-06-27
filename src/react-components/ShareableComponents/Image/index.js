import React from 'react';

class ImageIcon extends React.Component {
    Image = {
        type: 'image',
        img: new Image(),
        width: 16,
        height: 24,
        content: 'todo: pop up file explorer window to choose image'
    }

    componentWillUnmount() {
        Image.img = undefined;
    }

    render () {
        const marker = (
            <img style={this.props.style} src='/image.png' onClick={() => {
                this.props.onClick(this.Image, 'image')
            }}/>);
        const img = this.Image.img;
        if (img.src) {
            return marker;
        } else {
            if (!img.complete) {
                img.onload = () => {
                    img.src = '/happy_face.png';
                    return marker;
                }
            } else {
                img.src = 'happy_face.png';
                return marker;
            }
        }
    }
}

export default ImageIcon;
