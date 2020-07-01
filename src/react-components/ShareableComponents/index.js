import React from "react";
import Colors from "../../site-styles/Colors";

class ShareablePopup extends React.Component {
    render() {
        let shareableContent = {};
        if (this.props.shareable.user !== null) {
            shareableContent.username = this.props.shareable.user.username;
            shareableContent.date = this.props.shareable.date.toDateString();
            if (this.props.shareable !== null) {
                shareableContent.content = this.props.shareable.content;
            }
        } else {
            shareableContent.username = null;
            shareableContent.date = null;
        }
        return (
            <div className="selectedShareable" style={this.props.style}>
                <div>
                    <h3
                        style={{
                            fontSize: "1.5vh",
                            display: "inline",
                            margin: "0",
                            float: "left",
                            paddingLeft: "10px",
                        }}>
                        {shareableContent.username}: {shareableContent.date}
                    </h3>
                    <button
                        className="deleteButton"
                        style={this.props.editable()}
                        onClick={this.props.delete}></button>
                    <button
                        className="editButton"
                        style={this.props.editable()}
                        onClick={this.props.edit}></button>
                </div>
                <div>
                    <span>
                        {shareableContent.content}
                    </span>
                </div>
            </div>
        );
    }
}

export default ShareablePopup;
