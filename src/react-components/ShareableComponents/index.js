import React from "react";
import Colors from "../../site-styles/Colors";
import "./styles.css";

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
                <div className="selectedShareable_buttons">
                    <h3
                        style={{
                            fontSize: "1.5vh",
                            display: "inline",
                            margin: "0",
                            float: "left",
                            paddingLeft: "10px",
                        }}>
                        {shareableContent.username}
                    </h3>
                    <button
                        className="deleteButton"
                        style={this.props.editable()}
                        onClick={this.props.delete}><i class="fas fa-trash-alt"></i></button>
                    <button
                        className="editButton"
                        style={this.props.editable()}
                        onClick={this.props.edit}><i class="fas fa-edit"></i></button>
                    <button
                        className="shareButton"
                        style={this.props.editable()}
                        onClick={this.props.share}
                    ><i class="fas fa-share-square"></i></button>
                    <button
                        className="reportButton"
                        style={this.props.editable()}
                        onClick={this.props.report}
                    ></button>
                    
                </div>
                <div>
                    <span>
                        <span style={{float:"left"}}>{shareableContent.date}</span>
                        <br></br>
                        {/* TODO: Bug when adding shareable while not logged in it doesnt show up as  */}
                        {shareableContent.content}
                    </span>
                </div>
            </div>
        );
    }
}

export default ShareablePopup;
