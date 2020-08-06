import "./App.css";

import { Admin, ManageUsers } from "./react-components/UserFeatures/Admin";
import { ImageIcon, ImageMenu } from "./react-components/ShareableComponents/Image";
import { ManageReports, ReportMenu } from "./react-components/UserFeatures/Report";
import { Marker, OverlayView } from "@react-google-maps/api";
import { MarkerIcon, MarkerMenu } from "./react-components/ShareableComponents/Marker";
import {
    NotificationIcon,
    NotificationMenu,
} from "./react-components/UserFeatures/NotificationBar";
import { UserStatus, UserStatusMenu } from "./react-components/UserStatus";

import CollapsibleMenu from "./react-components/CollapsibleMenu";
import Colors from "./site-styles/Colors";
import Filter from "./react-components/Filter";
import Maps from "./react-components/Maps";
import News from "./react-components/News";
import PopoutButton from "./react-components/PopoutButton";
import React from "react";
import ShareablePopup from "./react-components/ShareableComponents";
import SiteHeader from "./react-components/SiteHeader";
import Timeline from "./react-components/Timeline";
import Tweets from "./react-components/Tweets";
import { UserInfo } from "./react-components/UserFeatures/UserInfo";
import { withRouter } from "react-router-dom";

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
    constructor(props) {
        super(props);

        this.state = {
            currentLeftMenuView: "filter",
            currentRightMenuView: "news",
            currentMode: this.props.showLogin ? "login" : "normal",
            currentPopup: this.props.showLogin ? "login" : "",
            shareables: [],
            selectedShareable: {
                center: { lat: 43.6623, lng: -79.3932 },
                content: "",
                user: null,
                type: null,
            },
            shareablePopupPos: { x: -1000, y: -1000 },
            mapCtx: null,
            currentShareable: null,
            currentDate: new Date(),
            selectedDate: new Date(),
            selectedShareableType: "All",
            idcounts: 2,
            currentUser: null,
            showNotification: false,
        };
    }

    //this is just to hardcode an example marker
    componentDidMount() {
        let example = {
            content: "example content",
            date: new Date(),
            dateText: "",
            height: 30,
            id: 1,
            selectedType: "News",
            type: "marker",
            width: 20,
            center: {
                lat: 43.6723,
                lng: -79.3932,
            },
            user: users[1],
            img: new Image(),
        };
        example.img.src = "/marker.png";
        this.addToShareableArray(example);
    }

    renderPopup(currentPopup) {
        const MarkerMenuProps = {
            state: this.state.currentShareable,
            updateDate: this.updateShareableDate.bind(this),
            enterPressed: this.setCurrentMode.bind(this),
            updateArticleType: this.updateArticleType.bind(this),
            shareableDate: this.state.shareableDate,
            updateCurrentDate: this.updateCurrentDate.bind(this),
            shouldClear: this.state.popupExit,
            onPopupExit: this.onPopupExit.bind(this),
        };

        const ImageMenuProps = {
            image: this.state.currentShareable,
            updateDate: this.updateShareableDate.bind(this),
            updateArticleType: this.updateArticleType.bind(this),
            shareableDate: this.state.shareableDate,
            updateCurrentDate: this.updateCurrentDate.bind(this),
            shouldClear: this.state.popupExit,
            onPopupExit: this.onPopupExit.bind(this),
        };

        const UserStatusMenuProps = {
            onValidationSuccess: (username) => {console.log(username); this.setState({currentUser: username, currentMode: "normal"})},
            updateCurrentUser: this.updateCurrentUser.bind(this),
            addUser: (newUser) => {
                users.push(newUser);
            },
            users: users,
            shouldClear: this.state.popupExit,
            onPopupExit: this.onPopupExit.bind(this),
        };

        const NotificationMenuProps = {
            shareShareable: this.shareShareable.bind(this),
            currentUser: this.state.currentUser,
            enterPressed: this.setCurrentMode.bind(this),
            currentMarker: this.state.selectedShareable,
        };

        const ReportMenuProps = {
            reportMarker: this.reportMarker.bind(this),
            enterPressed: this.setCurrentMode.bind(this),
            //the if condition is because we dont know if currentuser will be null
            currentUserUsername:
                this.state.currentUser === null ? null : this.state.currentUser.username,
            shareable: this.state.selectedShareable,
            shouldClear: this.state.popupExit,
            onPopupExit: this.onPopupExit.bind(this),
        };

        const ManageUsersProps = {
            users: users,
            deleteUser: this.deleteUser.bind(this),
        };

        const ManageReportsProps = {
            reports: users[0].reports,
            deleteReportedShareable: this.deleteReportedShareable.bind(this),
        };

        switch (currentPopup) {
            case "marker":
                return <MarkerMenu {...MarkerMenuProps} />;
            case "image":
                return <ImageMenu {...ImageMenuProps} />;
            case "notification":
                return <NotificationMenu {...NotificationMenuProps} />;
            case "report":
                return <ReportMenu {...ReportMenuProps} />;
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

    bindMap(map) {
        this.setState({
            mapCtx: map,
        });
    }

    /**
     * https://stackoverflow.com/questions/5471848/how-to-get-screen-xy-from-google-maps-v3-latlng
     */
    computeXYOfSelectedShareable() {
        const map = this.state.mapCtx;

        if (map === null || window === null || this.state.selectedShareable.center === undefined) {
            return { x: -999, y: -999 };
        }

        const numTiles = 1 << map.getZoom();
        const projection = map.getProjection();
        if (projection === undefined) {
            return { x: -999, y: -999 };
        }
        const lat = this.state.selectedShareable.center.lat;
        const lng = this.state.selectedShareable.center.lng;
        var worldCoordinate = projection.fromLatLngToPoint(new window.google.maps.LatLng(lat, lng));
        var pixelCoordinate = new window.google.maps.Point(
            worldCoordinate.x * numTiles,
            worldCoordinate.y * numTiles
        );

        var topLeft = new window.google.maps.LatLng(
            map.getBounds().getNorthEast().lat(),
            map.getBounds().getSouthWest().lng()
        );

        var topLeftWorldCoordinate = projection.fromLatLngToPoint(topLeft);
        var topLeftPixelCoordinate = new window.google.maps.Point(
            topLeftWorldCoordinate.x * numTiles,
            topLeftWorldCoordinate.y * numTiles
        );

        return new window.google.maps.Point(
            pixelCoordinate.x - topLeftPixelCoordinate.x,
            pixelCoordinate.y - topLeftPixelCoordinate.y
        );
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
                backgroundColor: Colors.background,
                color: Colors.textColorLight,
            },
        };

        const UserStatusProps = {
            currentUser: this.state.currentUser,
            openLoginMenu: () => {this.props.history.push("/App/login"); this.setState({ currentMode: "login", currentPopup: "login" })},
            logout: () => this.updateCurrentUser(null),
            shouldClear: this.state.popupExit,
            onPopupExit: this.onPopupExit.bind(this),
        };

        const FilterProps = {
            selectType: this.selectCallback.bind(this),
            currentUser: this.state.currentUser,
        };

        const MapsProps = {
            bindMap: this.bindMap.bind(this),
            currentDate: this.state.currentDate,
            shareables: this.state.shareables,
            currentShareable: this.state.currentShareable,
            addToShareableArray: this.addToShareableArray.bind(this),
            selectedType: this.state.selectedShareableType,
            inAddMode: this.state.currentMode === "placingShareable",
            onShareablePlaced: this.onShareablePlaced.bind(this),
            onZoomOrDrag: function () {
                this.setState({ shareablePopupPos: this.computeXYOfSelectedShareable() });
            }.bind(this),
        };

        const ShareablePopupProps = {
            shareable: this.state.selectedShareable,
            editable: this.userCanEdit.bind(this),
            edit: this.editMarker.bind(this),
            delete: this.deleteMarker.bind(this),
            share: this.shareMarkerState.bind(this),
            report: this.reportMarkerState.bind(this),
            position: this.state.shareablePopupPos,
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
            openUserManage: () =>
                this.setState({ currentMode: "manageUser", currentPopup: "manageUser" }),
            openReports: () =>
                this.setState({ currentMode: "manageReports", currentPopup: "manageReports" }),
        };

        let leftMenuView;
        switch (this.state.currentLeftMenuView) {
            case "filter":
                leftMenuView = <Filter {...FilterProps} />;
                break;
            case "info":
                if (this.state.currentUser && this.state.currentUser.username === "admin") {
                    leftMenuView = <Admin {...AdminProps} />;
                } else {
                    leftMenuView = <UserInfo currentUser={this.state.currentUser} />;
                }
                break;
            default:
                leftMenuView = null;
                break;
        }

        let rightMenuView;
        switch (this.state.currentRightMenuView) {
            case "tweets":
                rightMenuView = <Tweets user={this.state.currentUser} />;
                break;
            case "news":
                rightMenuView = <News currentDate={this.state.currentDate} />;
                break;
            default:
                rightMenuView = null;
                break;
        }
        console.log(this.state.currentMode, this.state.currentPopout)

        return (
            <div
                className="App"
                style={{ ...dynamicStyles.cursor, backgroundColor: Colors.backgroundDarkAccent }}>
                <SiteHeader>
                    <span className="currentDate">
                        <i className="fas fa-calendar-alt"></i>
                        {this.state.currentDate.toDateString()}
                    </span>
                    {this.state.currentUser != null && (
                        <button className="button" onClick={this.renderNotification.bind(this)}>
                            <i className="fas fa-bell"></i>Notifications
                        </button>
                    )}
                    <UserStatus {...UserStatusProps} />
                </SiteHeader>

                <div className="mainBody">
                    <CollapsibleMenu
                        views={["filter", "info"]}
                        switchView={(newView) => {
                            this.setState({ currentLeftMenuView: newView });
                        }}
                        position="left">
                        {leftMenuView}
                    </CollapsibleMenu>

                    {/* outerMapDiv and innerMapDiv were added due to an extra wrapper div being created by
                     * the Maps component from google-map-react which conflict with flexboxes */}
                    <div className="outerMapDiv">
                        <div className="innerMapDiv">
                            {this.state.showNotification && (
                                <NotificationIcon user={this.state.currentUser} />
                            )}
                            <Maps {...MapsProps}>
                                <ShareablePopup
                                    key={1}
                                    className="selectedShareable"
                                    style={dynamicStyles.selectedShareable}
                                    {...ShareablePopupProps}
                                />
                                {this.state.shareables.map((s, i) => {
                                    return (
                                        <Marker
                                            key={i + 2}
                                            options={{
                                                // TODO: Need to change the underlying representation of ImageIcon and MarkerIcon, then the icon URL can be changed.
                                                icon: {
                                                    url: "/marker.png",
                                                },
                                            }}
                                            onClick={() => {
                                                this.setState({
                                                    shareablePopupPos: { x: -1000, y: -1000 },
                                                });
                                            }}
                                            onMouseOver={() => {
                                                this.setState({ selectedShareable: s });
                                                this.setState({
                                                    shareablePopupPos: this.computeXYOfSelectedShareable(),
                                                });
                                            }}
                                            position={s.center}
                                        />
                                    );
                                })}
                            </Maps>
                        </div>
                        <div style={dynamicStyles.popupBox} className="popupBox">
                            <span
                                onClick={() => {
                                    this.props.history.push("/App");
                                    this.setCurrentMode.call(this);
                                }}>
                                x
                            </span>
                            {this.renderPopup(this.state.currentPopup)}
                        </div>
                        <PopoutButton position="bottom-right">
                            <MarkerIcon {...PopoutButtonIconProps} />
                            <ImageIcon {...PopoutButtonIconProps} />
                        </PopoutButton>
                    </div>
                    <CollapsibleMenu
                        views={["news", "tweets"]}
                        switchView={(newView) => {
                            this.setState({ currentRightMenuView: newView });
                        }}
                        position="right">
                        {rightMenuView}
                    </CollapsibleMenu>
                </div>
                <Timeline {...TimelineProps} />
            </div>
        );
    }

    deleteUser(e, user) {
        e.preventDefault();
        //filter shareables in state
        this.setState((prevState) => ({
            shareables: prevState.shareables.filter(
                (element) => !user.shareables.includes(element)
            ),
        }));

        users = users.filter((element) => user !== element); //filter users lsit

        this.setState({
            selectedShareable: {
                center: { lat: 63.6623, lng: -79.3932 },
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

    deleteMarker(marker) {
        this.setState((prevState) => ({
            shareables: prevState.shareables.filter((element) => element.id !== marker.id),
        }));
        const selectedShareableCopy = Object.assign({}, this.state.selectedShareable);
        selectedShareableCopy.center = {
            lat: 1000,
            lng: 1000,
        };
        this.setState({ selectedShareable: selectedShareableCopy });
    }

    deleteReportedShareable(marker) {
        this.deleteMarker(marker);
        marker.user.shareables = marker.user.shareables.filter((s) => s !== marker);
        users[0].reports = users[0].reports.filter((s) => s.shareable !== marker);
    }

    shareMarkerState() {
        this.setState({ currentShareable: this.state.selectedShareable });
        this.setState({ currentPopup: "notification" });
        this.setState({ currentMode: "editing" });
    }

    reportMarkerState() {
        this.setState({
            currentShareable: this.state.selectedShareable,
            currentPopup: "report",
            currentMode: "editing",
        });
    }

    reportMarker(reportMessage, username, shareable) {
        let report = {};
        report.message = reportMessage;
        report.userReporting = username;
        report.shareable = shareable;
        users[0].reports.push(report);
    }

    setCurrentMode() {
        this.setState({ currentMode: "normal" });
        this.setState({ popupExit: true });
    }

    onPopupExit() {
        this.setState({ popupExit: false });
    }

    updateCurrentUser(user) {
        this.setState({ currentUser: user });
        this.setState({ showNotification: false });
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

    shareShareable(username) {
        let user = null;
        users.forEach((element) => {
            if (element.username === username) {
                user = element;
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
                center: { lat: 1000, lng: 1000 },
                content: "",
                user: null,
                shareableType: null,
            },
        });
    }

    renderNotification() {
        if (this.state.showNotification) {
            this.setState({ showNotification: false });
        } else {
            this.setState({ showNotification: true });
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
                center: { lat: 1000, lng: 1000 },
                content: "",
                user: null,
                shareableType: null,
            },
        });
    }
}

export default withRouter(App);
