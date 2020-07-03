import React, { Component } from 'react'
import "./styles.css";

/**
 * An admin component where it contains all the admin functionality
 *
 * Props: 
 * - openUserManage: a function to handle switching current mode and current popup as 'manageUser'
 */
class Admin extends Component {

    render() {
        return (
            <div className="menu-val">
                <button className="button2" onClick={this.props.openUserManage}>Manage Users</button>
                <button className="button2" onClick={this.props.openReports}>Manage Reports</button>
            </div>
        )
    }
}

/**
 * An admin functionality to delete users
 *
 * Props: 
 * - users:     a list containing all the users
 * - deleteUser: a function to delete user and all its shareables
 */
class ManageUsers extends React.Component {

    render(){

        return(
            <div>
                <h1>Manage Users</h1>
                <div className="userContainer">
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

            </div>
        )
    }
}

export { Admin , ManageUsers };
