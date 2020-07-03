import React, { Component } from 'react'
import "./styles.css";

class Admin extends Component {

    renderPopupBox(){
        return(
            <div style={stylePopup}>
                Hello
            </div>
        )
    }

    render() {
        return (
            <div className="menu-val">
                <button className="button2" onClick={this.props.openUserManage}>View Users</button>
                <button className="button2">View Markers</button>
                {this.renderPopupBox()}
            </div>
        )
    }
}

const stylePopup = {
    position: "absolute",
    left: '20vw',
    top: '10vh',
    height: '100px'
}

class ManageUsers extends React.Component {

    render(){

        return(
            <div id="userContainer" className="userContainer">
                hi this admin
                {/* {this.generateUsers()} */}
                {this.props.users.map((user) => {
                    if(user.username !== 'admin'){
                        return <div key ={user.username} className="user-val">
                                    <span>{user.username}</span>
                                    <button onClick={(e)=>{this.props.deleteUser(e, user)}}>delete</button>
                                </div>
                    }
                })}

            </div>
        )
    }
}

export { Admin , ManageUsers };
