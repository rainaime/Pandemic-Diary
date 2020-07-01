import React, { Component } from 'react'

export class UserInfo extends Component {
    constructor(props){
        super(props)

        this.renderUserInfo.bind(this)
    }

    renderUserInfo(){
        return(
            <div>
                <div className="holder" style={squareHolder}>
                        {/* profile picture holder */}
                        
                </div>
                <h3>Hello {this.props.currentUser.username}</h3>
                <div style={{display: 'left'}}>
                    Content
                </div>
                <div className="shareables_container">
                    {this.props.currentUser.shareables.map( (shareable) => this.renderShareable(shareable) )}
                </div>
            </div>
        );
    }

    renderShareable(shareable){
        return(
            <div style={{border: "1px solid white"}}>
                {shareable.date.toDateString()}
                : 
                {shareable.content}
            </div>
        )
    }

    render() {
        return (
            <div>
                {(this.props.currentUser === null) ?
                <div>Please login to view user info. </div> : 
                this.renderUserInfo()
                }
            </div>
        )
    }
}

const squareHolder = {
    color: 'red',
    height: '10vh',
    width: '40%',
    margin: '5vw',
    border: '1px solid red'
}

export default UserInfo
