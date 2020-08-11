import React from "react";
import "./styles.css";

/**
 * Popup to display user content/ image. Also has edit, share, report and delete
 * functionality
 *
 * Props: 
 * - shareable: selected shareable
 * - editable: function to change style when editing
 * - edit: function to edit shareable
 * - delete: function to delete shareable
 * - share: function to share shareable with other user
 * - report: function to report a user
 */
class ShareablePopup extends React.Component {
    render() {
        let shareableContent = {};
        if (this.props.shareable.user !== null) {
            shareableContent.authorName = this.props.shareable.authorName;
            // TODO shareable.date when switched to json 
            // shareableContent.date = this.props.shareable.date.toDateString();
        } else {
            shareableContent.username = null;
            shareableContent.date = null;
        }
        if (this.props.shareable !== null) {
            shareableContent.content = this.props.shareable.content;
        }
        const position = this.props.position;
        return (
            <div className="selectedShareable" style={{...this.props.style, top: position.y, left: position.x}}>
                <div className="selectedShareable_buttons">
                    <h3 className="header-style">
                        {shareableContent.username}
                    </h3>
                    <button
                        className="deleteButton"
                        style={{visibility: "hidden"}}
                        onClick={() => this.props.delete(this.props.shareable)}><i className="fas fa-trash-alt"></i></button>
                    <button
                        className="editButton"
                        style={{visibility: "hidden"}}
                        onClick={this.props.edit}><i className="fas fa-edit"></i></button>
                    <button
                        className="shareButton"
                        style={{visibility: "hidden"}}
                        onClick={this.props.share}
                    ><i className="fas fa-share-square"></i></button>
                    <button
                        className="reportButton"
                        style={{visibility: "hidden"}}
                        onClick={this.props.report}
                    ><i className="fas fa-flag"></i></button>
                    
                </div>
                <div>
                    <span>
                        <span className="content">{shareableContent.date}</span>
                        <br></br>
                        {shareableContent.content}
                    </span>
                </div>
            </div>
        );
    }
}

export default ShareablePopup;
