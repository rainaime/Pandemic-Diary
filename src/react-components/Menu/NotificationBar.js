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
            this.setState({error: false})
        }
    }

    updateUser(e){
        this.setState({searchingUsername: e.target.value})
    }

    render(){
        return(
            <div>
                <h2>Share/Invite!</h2>
                <span className="greeting">
                    Enter the user you'd like to share this with!
                </span>
                <form>
                    <input type="text" onChange={this.updateUser.bind(this)}/>
                    <button type="button" style={buttonStyle} value="Submit" onClick={this.submit.bind(this)}>Submit</button>
                </form>
                {this.state.error ? "User not Found" : null}
            </div>
        )
    }
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

export default NotificationMenu
