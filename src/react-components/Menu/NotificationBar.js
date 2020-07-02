import React, { Component } from 'react'

class NotificationMenu extends React.Component{

    state={
        searchingUsername: null,
        error: false
    }

    submit(e){
        if (!this.props.shareShareable(this.state.searchingUsername)){
            // this.props.currentUser.shared.push(this.props.currentMarker)
            this.setState({error: true})
        } else {
            this.props.enterPressed()
            this.setState({error: false})
        }
    }

    updateUser(e){
        this.setState({searchingUsername: e.target.value})
    }

    handleEnter(e){
        if (e.key === "Enter") {
            e.preventDefault()
            this.submit(e);

        }
    }

    render(){
        return(
            <div>
                <h1 className="popupBox_title">Share/Invite!</h1>
                <span className="greeting">
                    Enter the user you'd like to share this with!
                </span>
                <form>
                    <input type="text" onChange={this.updateUser.bind(this)} onKeyPress={this.handleEnter.bind(this)}/>
                    <button type="button" style={buttonStyle} value="Submit" onClick={this.submit.bind(this)}>Submit</button>
                </form>
                {this.state.error ? "User not Found" : null}
            </div>
        )
    }
}

class NotificationIcon extends React.Component {
    renderShared(shareable) {
        return (
            <div style={contentStyle}>
                {shareable.user.username}: {shareable.content}
            </div>
        );
    }

    render(){
        return(
            <div style={notificationStyle}>
                {(this.props.user === null) ? 
                <h3>login to use</h3> :
                <><h3>Markers Shared:</h3>
                <div className="content_container">
                    {this.props.user.shared.map((shareable) =>
                            this.renderShared(shareable)
                        )}
                </div></>}
            </div>
        )
    }
}

const contentStyle = {
    textAlign: "left",
    paddingLeft: "1vw",

}

const notificationStyle = {
    position: "absolute",
    left: "58vw",
    top: "6vh",
    width: "20vw",
    height: "25vh",
    zIndex: '10',
    backgroundColor: '#003f5c',
}

const buttonStyle = {
    background: "none",
    color: "inherit",
	border: "none",
	/* font: inherit, */
	cursor: "pointer",
    outline: "inherit",
    // font-size: 1.2vw,
}

export { NotificationMenu , NotificationIcon }
