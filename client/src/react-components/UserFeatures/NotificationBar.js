import React from "react";

class NotificationMenu extends React.Component {
    state = {
        searchingUsername: null,
        error: false,
    };

    submit(e) {
        fetch(`/sharing`, {
            method: "post",
            body: JSON.stringify({shareable: this.props.selectedShareable, 
                receiverUser: this.state.searchingUsername}),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                if (res.status === 200) {
                    //should set some kind of successful share on front end here
                    console.log("successful share");
                }
            })
            .catch((err) => console.log(err));

        //TODO: when success exit out of sharing, and notifiy successful share
    }

    updateUser(e) {
        this.setState({ searchingUsername: e.target.value });
    }

    handleEnter(e) {
        if (e.key === "Enter") {
            e.preventDefault();
            this.submit(e);
        }
    }

    render() {
        return (
            <div>
                <h1 className="popupBox_title">Share/Invite!</h1>
                <span className="greeting">Enter the user you'd like to share this with!</span>
                <form>
                    <input
                        type="text"
                        onChange={this.updateUser.bind(this)}
                        onKeyPress={this.handleEnter.bind(this)}
                    />
                    <button
                        type="button"
                        style={buttonStyle}
                        value="Submit"
                        onClick={this.submit.bind(this)}>
                        Submit
                    </button>
                </form>
                {this.state.error ? "User not Found" : null}
            </div>
        );
    }
}

class NotificationIcon extends React.Component {
    state = {
        shared: [],
    }

    componentDidMount(){
        const user = this.props.user;
        console.log(user)

        fetch(`/shared/${user}`, {
            method: "get",
        })
            .then((res) => {
                if (res.status === 200) {
                    //should set some kind of successful share on front end here
                    // console.log(res.body);
                }
            })
            .catch((err) => console.log(err));
        // this.setState({shared:})
    
    }

    renderShared(shareable) {
        return (
            <div style={contentStyle}>
                <p>{shareable.user.username}:</p>
                {shareable.content}
            </div>
        );
    }

    render() {
        return (
            <div>
            {/* <div style={notificationStyle}> */}
                {this.props.user === null ? (
                    <h3>login to use</h3>
                ) : (
                    <>
                        <h3>Markers Shared:</h3>
                        <div className="content_container">
                            {/* {this.props.user.shared.map((shareable) =>
                                this.renderShared(shareable)
                            )} */}
                        </div>
                    </>
                )}
            </div>
        );
    }
}

const contentStyle = {
    textAlign: "left",
    paddingLeft: "1vw",
};

const notificationStyle = {
    color: "white",
    display: 'flex',
    flexDirection: 'column',
    position: "absolute",
    wordWrap: "break",
    top: "30px",
    right: "4px",
    width: "50%",
    height: "30%",
    zIndex: "10",
    backgroundColor: "#416E8E",
    borderRadius: "25px",
    // backgroundColor: '#003f5c',
};

const buttonStyle = {
    background: "none",
    color: "inherit",
    border: "none",
    /* font: inherit, */
    cursor: "pointer",
    outline: "inherit",
    // font-size: 1.2vw,
};

export { NotificationMenu, NotificationIcon };
