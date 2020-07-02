import React, { Component } from 'react'

export class Admin extends Component {

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
                <button className="button2" onClick={console.log("clicked")}>View Users</button>
                <button className="button2">View Markers</button>
                {/* <button>View Users</button> */}
                {/* <div className="popupBox"></div> */}
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

export default Admin
