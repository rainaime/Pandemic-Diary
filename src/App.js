import React from "react";
import "./App.css";
import Colors from "./site-styles/Colors";
import SiteHeader from "./react-components/SiteHeader";
import Maps from "./react-components/Maps";
import Menu from "./react-components/Menu";
import { Admin, ManageUsers } from "./react-components/Menu/Admin";
import UserInfo from "./react-components/Menu/UserInfo";
import Tweets from "./react-components/Tweets";
import News from "./react-components/News";
import CollapsibleMenu from "./react-components/CollapsibleMenu";
import Timeline from "./react-components/Timeline";
import PopoutButton from "./react-components/PopoutButton";
import { UserStatus, UserStatusMenu } from "./react-components/UserStatus";
import ShareablePopup from "./react-components/ShareableComponents";
import { ImageIcon, ImageMenu } from "./react-components/ShareableComponents/Image";
import { MarkerIcon, MarkerMenu } from "./react-components/ShareableComponents/Marker";
import { NotificationMenu, NotificationIcon } from "./react-components/Menu/NotificationBar";
import { ReportMenu, ManageReports } from "./react-components/Menu/Report";

const appSettings = {
    minDate: new Date("December 1 2019"),
    maxDate: new Date("December 31 2020"),
};

let users = [
    //admin probably does not need shareables or shared
    { username: "admin", password: "admin", shareables: [], shared: [], reports: [] },
    { username: "user", password: "user", shareables: [], shared: [] },
    { username: "user2", password: "user2", shareables: [], shared: [] },
];

class App extends React.Component {
    state = {
        currentLeftMenuView: "filter",
        currentRightMenuView: "tweets",
        currentMode: "normal",
        shareables: [],
        selectedShareable: {
            x: -200,
            y: -200,
            content: "",
            user: null,
            type: null,
        },
        currentShareable: null,
        currentDate: new Date(),
        selectedDate: new Date(),
        selectedShareableType: "All",
        currentPopup: "",
        idcounts: 1,
        currentUser: users[1],
        showNotification: false,
    };

    renderPopup(currentPopup) {
        const MarkerMenuProps = {
            state: this.state.currentShareable,
            updateDate: this.updateShareableDate.bind(this),
            enterPressed: this.setCurrentMode.bind(this),
            updateArticleType: this.updateArticleType.bind(this),
            shareableDate: this.state.shareableDate,
            updateCurrentDate: this.updateCurrentDate.bind(this),
        };

        const ImageMenuProps = {
            image: this.state.currentShareable,
            updateDate: this.updateShareableDate.bind(this),
            updateArticleType: this.updateArticleType.bind(this),
            shareableDate: this.state.shareableDate,
            updateCurrentDate: this.updateCurrentDate.bind(this),
        };

        const UserStatusMenuProps = {
            updateCurrentUser: this.updateCurrentUser.bind(this),
            onSuccess: () => {
                this.setState({ currentMode: "normal" });
            },
            addUser: (newUser) => {
                users.push(newUser);
            },
            users: users,
        };

        const NotificationMenuProps = {
            shareShareable: this.shareShareable.bind(this),
            currentUser: this.state.currentUser,
            enterPressed: this.setCurrentMode.bind(this),
            currentMarker: this.state.selectedShareable,
        }

        const ReportMenuProps = {
            reportMarker: this.reportMarker.bind(this),
            enterPressed: this.setCurrentMode.bind(this),
            //the if condition is because we dont know if currentuser will be null
            currentUserUsername: 
                this.state.currentUser === null ?
                null : this.state.currentUser.username,
            shareable: this.state.selectedShareable,
        }

        const ManageUsersProps = {
            users: users,
            deleteUser: this.deleteUser.bind(this),
        }

        const ManageReportsProps = {
            reports: users[0].reports,
            deleteReportedShareable: this.deleteMarker.bind(this),
        }

        switch (currentPopup) {
            case "marker":
                return <MarkerMenu {...MarkerMenuProps} />;
            case "image":
                return <ImageMenu {...ImageMenuProps} />;
            case "notification":
                return <NotificationMenu {...NotificationMenuProps}/>;
            case "report":
                return <ReportMenu {...ReportMenuProps}/>  
            case "login":
                return <UserStatusMenu {...UserStatusMenuProps} />;
            case "manageUser":
                return <ManageUsers {...ManageUsersProps} />;
            case "manageReports":
                return <ManageReports {...ManageReportsProps} />;
            default:
                return null;
        }
    }

    render() {
        const dynamicStyles = {
            cursor: {
                cursor: this.state.currentMode === "placingShareable" ? "crosshair" : "auto",
            },
            popupBox: {
                backgroundColor: Colors.background,
                color: Colors.textColorLight,
                visibility:
                    this.state.currentMode === "normal" ||
                    this.state.currentMode === "placingShareable"
                        ? "hidden"
                        : "visible",
            },
            selectedShareable: {
                top: this.state.selectedShareable.y + 25,
                left: this.state.selectedShareable.x,
                backgroundColor: Colors.background,
                color: Colors.textColorLight,
            },
        };

        const UserStatusProps = {
            currentUser: this.state.currentUser,
            openLoginMenu: () => this.setState({ currentMode: "login", currentPopup: "login" }),
            logout: () => this.updateCurrentUser(null),
        };

        const MenuProps = {
            selectType: this.selectCallback.bind(this),
            currentUser: this.state.currentUser,
        };

        const MapsProps = {
            currentDate: this.state.currentDate,
            shareables: this.state.shareables,
            currentShareable: this.state.currentShareable,
            addToShareableArray: this.addToShareableArray.bind(this),
            selectedType: this.state.selectedShareableType,
            updateSelectedShareable: (s) => this.setState({ selectedShareable: s }),
            inAddMode: this.state.currentMode === "placingShareable",
            onShareablePlaced: this.onShareablePlaced.bind(this),
        };

        const ShareablePopupProps = {
            shareable: this.state.selectedShareable,
            editable: this.userCanEdit.bind(this),
            edit: this.editMarker.bind(this),
            delete: this.deleteMarker.bind(this),
            share: this.shareMarkerState.bind(this),
            report: this.reportMarkerState.bind(this),
        };

        const PopoutButtonIconProps = {
            date: this.state.currentDate,
            onClick: this.enterAddingMode.bind(this),
        };

        const TimelineProps = {
            minDate: appSettings.minDate,
            currentDate: this.state.currentDate,
            maxDate: appSettings.maxDate,
            updateCurrentDate: this.updateCurrentDate.bind(this),
        };

        const AdminProps = {
            openUserManage: () => this.setState({ currentMode: "manageUser", currentPopup: "manageUser"}),
            openReports: () => this.setState({currentMode: "manageReports", currentPopup: "manageReports"})
        }

        let leftMenuView;
        switch(this.state.currentLeftMenuView) {
            case "filter":
                leftMenuView = <Menu {...MenuProps}/>;
                break;
            case "info":
                if (this.state.currentUser && this.state.currentUser.username === "admin") {
                    leftMenuView = <Admin {...AdminProps}/>
                } else {
                    leftMenuView = <UserInfo currentUser={this.state.currentUser}/>
                }
                break;
            default:
                leftMenuView = null;
                break;
        }

        let rightMenuView;
        switch(this.state.currentRightMenuView) {
            case "tweets":
                rightMenuView = <Tweets user={this.state.currentUser}/>;
                break;
            case "news":
                rightMenuView = <News currentDate={this.state.currentDate}/>;
                break;
            default:
                rightMenuView = null;
                break;
        }

        return (
            <div className="App" style={{...dynamicStyles.cursor, backgroundColor: Colors.backgroundDarkAccent}}>
                <SiteHeader>
                    <span className="currentDate"><i class="fas fa-calendar-alt"></i>{this.state.currentDate.toDateString()}</span>
                    {this.state.currentUser != null && 
                    <button className="button" 
                        onClick={this.renderNotification.bind(this)}>
                        <i class="fas fa-bell"></i>Notifications
                    </button>}
                    {/* <input type="image" src="./share.png" 
                        onClick={this.renderNotification.bind(this)}
                        style={{maxWidth: "100%", maxHeight: "100%"}}/> */}
                    <UserStatus {...UserStatusProps} />
                </SiteHeader>

                <div className="mainBody">
                    <CollapsibleMenu views={["filter", "info"]} switchView={(newView) => {this.setState({currentLeftMenuView: newView})}} position="left">
                        {leftMenuView}
                    </CollapsibleMenu>

                    {/* outerMapDiv and innerMapDiv were added due to an extra wrapper div being created by
                     * the Maps component from google-map-react which conflict with flexboxes */}
                    <div className="outerMapDiv">
                        <div className="innerMapDiv">
                {this.state.showNotification && <NotificationIcon user={this.state.currentUser}/>}
                            <Maps {...MapsProps}>
                                <ShareablePopup
                                    className="selectedShareable"
                                    style={dynamicStyles.selectedShareable}
                                    {...ShareablePopupProps}
                                />
                            </Maps>
                        </div>
                        <div style={dynamicStyles.popupBox} className="popupBox">
                            <span onClick={this.setCurrentMode.bind(this)}>x</span>
                            {this.renderPopup(this.state.currentPopup)}
                        </div>
                        <PopoutButton position="bottom-right">
                            <MarkerIcon {...PopoutButtonIconProps} />
                            <ImageIcon {...PopoutButtonIconProps} />
                        </PopoutButton>
                    </div>
                    <CollapsibleMenu views={["tweets", "news"]} switchView={(newView) => {this.setState({currentRightMenuView: newView})}} position="right">
                        {rightMenuView}
                    </CollapsibleMenu>
                </div>
                <Timeline {...TimelineProps} />
            </div>
        );
    }

    deleteUser(e, user){
        e.preventDefault()
        //filter shareables in state
        this.setState((prevState) => ({
            shareables: prevState.shareables.filter(
                (element) => !user.shareables.includes(element)),
        }));

        users = users.filter((element) => user !== element);//filter users lsit

        this.setState({
            selectedShareable: {
                x: -200,
                y: -200,
                content: "",
                user: null,
                shareableType: null,
            },
        });
    }

    updateArticleType(selectedType) {
        this.state.currentShareable.updateSelectedType(selectedType);
    }

    addToShareableArray(shareable) {
        shareable.id = this.state.idcounts;

        //probably should not be giving the whole user object for shareable to use
        shareable.user = this.state.currentUser;

        this.setState({
            idcounts: this.state.idcounts + 1,
        });

        this.setState({
            shareables: [...this.state.shareables, shareable],
            currentShareable: shareable,
        });

        if (this.state.currentUser) {
            this.setState({
                currentUser: Object.assign(this.state.currentUser, {
                    shareables: [...this.state.currentUser.shareables, shareable],
                }),
            });
        }
    }

    enterAddingMode(shareableType) {
        this.setState({
            currentMode: "placingShareable",
            currentShareable: shareableType,
        });
    }

    onShareablePlaced(popupType) {
        this.setState({
            currentMode: "editingShareable",
            currentPopup: this.state.currentShareable.type,
        });
    }

    onContentAdded() {
        this.setState({
            currentMode: "normal",
            currentPopup: "",
        });
    }

    editMarker() {
        this.setState({ currentShareable: this.state.selectedShareable });
        this.setState({ currentMode: "editingShareable" });
        this.setState({ currentPopup: this.state.selectedShareable.type });
    }

    deleteMarker() {
        this.setState((prevState) => ({
            shareables: prevState.shareables.filter(
                (element) => element.id !== this.state.selectedShareable.id
            ),
        }));

        const selectedShareableCopy = Object.assign({}, this.state.selectedShareable);
        selectedShareableCopy.x = -200;
        selectedShareableCopy.y = -200;
        this.setState({ selectedShareable: selectedShareableCopy });
    }

    shareMarkerState() {
        this.setState({ currentShareable: this.state.selectedShareable });
        this.setState({ currentPopup: "notification" });
        this.setState({ currentMode: "editing" });
    }

    reportMarkerState(){
        this.setState({
            currentShareable: this.state.selectedShareable,
            currentPopup: "report",
            currentMode: "editing" //not sure if you need this one i honestly dont know how this works
        })
    }

    reportMarker(reportMessage, username, shareable){
        let report = {};
        report.message = reportMessage;
        report.userReporting = username;
        report.shareable = shareable;
        users[0].reports.push(report);
    }

    setCurrentMode() {
        this.setState({ currentMode: "normal" });
        console.log("enter")
    }

    updateCurrentUser(user) {
        this.setState({ currentUser: user });
        this.setState({showNotification: false})
    }

    userCanEdit() {
        if (this.state.selectedShareable.user !== this.state.currentUser) {
            if (this.state.currentUser != null && this.state.currentUser.username !== "admin") {
                return {
                    visibility: "hidden",
                };
            }

            return {
                visibility: "hidden",
            };
        }
    }

    getShareableUser() {
        if (this.state.selectedShareable.user === null) return null;
        else return this.state.selectedShareable.user.username;
    }

    shareShareable(username){
        let user = null
        users.forEach(element => {
            if (element.username === username){
                user = element
            }
        });

        if (user === null) return false;
        else {
            user.shared.push(this.state.selectedShareable);
            return true;
        }
    }

    getMarkerDate() {
        if (this.state.selectedShareable != null && this.state.selectedShareable.date != null)
            return this.state.selectedShareable.date.toDateString();
    }

    selectCallback(type) {
        this.setState({ selectedShareableType: type });
        this.setState({
            selectedShareable: {
                x: -200,
                y: -200,
                content: "",
                user: null,
                shareableType: null,
            },
        });
    }

    renderNotification(){
        if (this.state.showNotification){
            this.setState({showNotification: false})
            if (this.state.currentUser != null)
                this.state.currentUser.shared = []
        } else {
            this.setState({showNotification: true})

        }
    }

    updateShareableDate(time) {
        time.setTime(time.getTime() + time.getTimezoneOffset() * 60 * 1000);
        this.state.currentShareable.updateDate(time);
    }

    //change Time Line
    updateCurrentDate(time) {
        time.setTime(time.getTime() + time.getTimezoneOffset() * 60 * 1000);
        this.setState({ currentDate: time });
        this.setState({
            selectedShareable: {
                x: -200,
                y: -200,
                content: "",
                user: null,
                shareableType: null,
            },
        });
    }
}

export default App;
