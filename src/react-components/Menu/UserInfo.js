import React, { Component } from "react";

export class UserInfo extends Component {
    constructor(props) {
        super(props);

        this.renderUserInfo.bind(this);
    }

    renderUserInfo() {
        return (
            <div>
                <div className="holder" style={squareHolder}>
                    {/* profile picture holder */}
                    this a pfp or something
                </div>
                <h3>Hello {this.props.currentUser.username}</h3>
                <div style={{ display: "left" }}>Content</div>
                <div className="shareables_container">
                    {/* there is a bug here that when a shareable is deleted
                        the mutation does not affect this array as well which causes the render here to render deleted shareables*/}
                    {this.props.currentUser.shareables.map((shareable) =>
                        this.renderShareable(shareable)
                    )}
                </div>
                <div className="notification">
                    Notifications / Shared Articles
                    {this.props.currentUser.shared.map((notification) =>
                        this.renderNotification(notification)
                    )}
                </div>
            </div>
        );
    }

    renderShareable(shareable) {
        return (
            <div style={{ border: "1px solid white" }}>
                {shareable.date.toDateString()}: <br/>
                {shareable.content}
            </div>
        );
    }

    renderNotification(shareable) {
        return (
            <div>
                {shareable.user.username}: {shareable.content}
            </div>
        );
    }

    render() {
        return (
            <div>
                {this.props.currentUser === null ? (
                    <div>Please login to view user info. </div>
                ) : (
                    this.renderUserInfo()
                )}
            </div>
        );
    }
}

const squareHolder = {
    color: "red",
    height: "10vh",
    width: "40%",
    margin: "5vw",
    border: "1px solid red",
};

export default UserInfo;
