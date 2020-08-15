import "./App.css";

import { Admin, ManageUsers } from "./react-components/UserFeatures/Admin";
import { ImageIcon, ImageMenu } from "./react-components/ShareableComponents/Image";
import { ManageReports, ReportMenu } from "./react-components/UserFeatures/Report";
import { Marker } from "@react-google-maps/api";
import { MarkerIcon, MarkerMenu } from "./react-components/ShareableComponents/Marker";
import { UserInfo } from "./react-components/UserFeatures/UserInfo";
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
import { withRouter } from "react-router-dom";

const appSettings = {
    minDate: new Date("December 1 2019"),
    maxDate: new Date("December 31 2020"),
};

const HelpBox = () => (
    <div style={{ height: "100%", width: "100%", padding: "0 20px", overflowY: "scroll" }}>
        <h1>Instructions</h1>Welcome to Pandemic Diary! This is a website that was created to
        interactively help users keep track of their plans during and after the 2019-20?? COVID-19
        pandemic.
        <p>Here are some examples of user interactions that are available:</p>
        <div className="landingPage_features_flex">
            <div>
                <p>
                    Collapsing side menus: you can click the collapse button on the side menus to
                    collapse them so that the map is larger.
                </p>
            </div>
            <div>
                <p>
                    Selecting a date to travel to: by clicking and dragging on the Timeline, you can
                    see content specific to a certain day.
                </p>
                <div>
                    <img alt="" src="/timeline.png" />
                </div>
            </div>

            <div>
                <p>Viewing News specific to a certain day</p>
                <div>
                    <img alt="" src="/news.png" />
                </div>
            </div>
            <div>
                <p>
                    Adding a marker (text or image) to the map: when hovering over the PopoutButton,
                    some shareables will show up. Click them to enable the adding mode, and click
                    somewhere on the to place the marker. A popup window will appear, allowing you
                    to modify the contents of the marker you placed.
                </p>
                <div>
                    <img alt="" src="/addingmarkers.gif" />
                </div>
            </div>
            <div>
                <p>
                    Categorizing markers: currently, we have certain groups you can place shareables
                    in: news, vacation, and other. With this, you can describe the current state of
                    affairs in the world or plan a vacation! Select from the filters on the left
                    side to narrow down your search.
                </p>
            </div>
            <div>
                <p>
                    Editing markers you’ve placed: currently, there is the option to share your
                    marker, edit its contents, or delete it.
                </p>
                <div>
                    <img alt="" src="/editingmarkers.png" />
                </div>
            </div>
            <div>
                <p>
                    When a marker is shared with another user (by clicking the share button and
                    typing in the user’s username), the other user will see the shareable pop up in
                    their notifications box.
                </p>
                <div>
                    <img alt="" src="/sharedmarkers.png" />
                </div>
            </div>
            <div>
                <p>
                    When the admin is logged in, the “Info” box in the left menu panel contains an
                    admin panel in which the administrator can view reported markers to moderate the
                    content, or delete problematic users.
                </p>
            </div>
        </div>
    </div>
);

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // What's currently being displayed on the left and right menus
            currentLeftMenuView: "filter",
            currentRightMenuView: "news",

            // Mode: One of:
            //  - "normal"; interacting with the app without adding anything
            //  - "login"; logging in or registering
            //  - "placingShareable"; in interactive mode on the app to place shareables
            currentMode: this.props.showLogin ? "login" : "normal",

            // The user currently logged in and interacting with the website.
            // ONLY used for stylistic purposes. Session should be used to validate requests.
            currentUsername: null,

            currentDate: new Date(),

            // Contains image form data of the current selectedShareable, if it
            // is an image-type shareable.
            currentImageForm: null,

            // Popup: One of:
            //  - "marker"; modifying a Marker shareable
            //  - "image"; modifying an Image shareable
            //  - "notification": viewing received notifications
            //  - "login"
            //  - "manageUser": modifying user info (admin feature)
            //  - "report": viewing reported shareables (admin feature)
            currentPopup: this.props.showLogin ? "login" : "",
            popupExit: false, // Used to trigger input form resets

            // The shareables being displayed on the screen at the moment.
            shareables: [],

            // The shareable currently being modified.
            selectedShareable: {
                center: { lat: 1000, lng: 1000 },
                content: "",
                user: null,
                type: null,
                article: "",
            },

            // The location of the popup that appears on the map when hovering over a shareable.
            shareablePopupPos: { x: -1000, y: -1000 },

            // Context for the Maps object, used for calculation of positions.
            mapCtx: null,

            // Indicate which article to fillter out
            articleType: "News",

            errorMessage: "",
        };
    }

    setLeftView(option) {
        if (option === "filter" || option === "info") {
            this.setState({
                currentLeftMenuView: option,
            });
        }

        if (option === "info" && this.state.currentUser === "admin"){
            this.setState({
                currentMode: "manageReports",
                currentPopup: "manageReports"
            })
        }
    }

    setRightView(option) {
        if (option === "tweets" || option === "news") {
            this.setState({
                currentRightMenuView: option,
            });
        }
    }

    setCurrentMode(mode) {
        const appModes = ["normal", "login", "placingShareable"];

        if (appModes.indexOf(mode) !== -1) {
            this.setState({
                currentMode: mode,
            });
        }
    }

    setCurrentPopup(popup) {
        const appPopups = ["marker", "image", "notification", "login", "manageUser", "report"];

        if (appPopups.indexOf(popup) !== -1) {
            this.setState({
                currentPopup: popup,
            });
        }
    }

    setSelectedShareable(shareable) {
        this.setState({
            selectedShareable: shareable,
        });
    }

    setShareableType(type) {
        const shareableTypes = ["marker", "image"];

        if (shareableTypes.indexOf(type) !== -1) {
            this.setState({
                shareableTypeToAdd: type,
            });
        } else {
            // Invalid entry
            this.setState({
                currentMode: "normal",
                currentPopup: "",
            });
        }
    }

    updateSelectedPopupPos() {
        this.setState({
            shareablePopupPos: this.computeXYOfSelectedShareable(),
        });
    }

    updateCurrentDate(date) {
        this.setState(
            {
                currentDate: date,
            },
            () => {
                fetch(`/shareables/${this.state.currentDate}`)
                    .then((res) => res.json())
                    .then((json) => {
                        this.setState({
                            shareables: json,
                            shareablePopupPos: { x: -1000, y: -1000 },
                        });
                    })
                    .catch((err) => console.log(err));
            }
        );
    }

    updateImageForm(form) {
        this.setState(
            {
                currentImageForm: new FormData(form),
            },
            () => {}
        );
    }

    updateSelectedShareable(newData) {
        // We don't need this to be updated immediately as the next update will
        // trigger a refresh.
        const old = this.state.selectedShareable;
        this.setState({ selectedShareable: Object.assign(old, newData) }, () => {
            if (
                newData.date &&
                new Date(newData.date).toDateString() === this.state.currentDate.toDateString()
            ) {
                this.setState(
                    {
                        shareables: this.state.shareables.filter((s) => s !== old),
                    },
                    () => {
                        this.addToShareableArray(this.state.selectedShareable);
                    }
                );
            } else if (newData.date) {
                this.setState(
                    {
                        currentDate: new Date(newData.date),
                    },
                    () => this.getShareablesForCurrentDate()
                );
            }
        });
    }

    renderNotification() {
        if (this.state.currentPopup === "notificationView") {
            this.setState({
                currentMode: "normal",
                currentPopup: "",
            });
        } else {
            this.setState({
                currentMode: "something?",
                currentPopup: "notificationView",
            });
        }
    }

    renderShareables() {
        return this.state.shareables.map((s, i) => {
            if (s.type === "marker") {
                return (
                    <Marker
                        key={i + 2}
                        options={{ icon: { url: "/marker.png" } }}
                        onClick={() => this.setState({ shareablePopupPos: { x: -1000, y: -1000 } })}
                        onMouseOver={() => {
                            this.setState(
                                {
                                    selectedShareable: s,
                                },
                                () => {
                                    this.setState({
                                        shareablePopupPos: this.computeXYOfSelectedShareable(),
                                    });
                                }
                            );
                        }}
                        position={s.center}
                    />
                );
            } else {
                return (
                    <Marker
                        key={i + 2}
                        options={{ icon: { url: s.image_url } }}
                        onClick={() => this.setState({ shareablePopupPos: { x: -1000, y: -1000 } })}
                        onMouseOver={() => {
                            this.setState(
                                {
                                    selectedShareable: s,
                                },
                                () => {
                                    this.setState({
                                        shareablePopupPos: this.computeXYOfSelectedShareable(),
                                    });
                                }
                            );
                        }}
                        position={s.center}
                    />
                );
            }
        });
    }

    enterAddingMode(shareable) {
        const shareableCopy = Object.assign(shareable, {
            date: this.state.currentDate,
            user: this.state.currentUser,
        });

        this.setState(
            {
                errorMessage: this.state.currentUser
                    ? ""
                    : "You are not currently logged in, so shareables placed will not be seen by anyone else and they will be erased when you leave the page. Please sign in if you'd like to use all features of the site.",
                shareablePopupPos: { x: -1000, y: -1000 },
            },
            () => this.postShareable(shareableCopy)
        );
    }

    addToShareableArray(shareable) {
        this.setState({
            shareables: [...this.state.shareables, shareable],
        });
    }

    editShareable() {
        this.setState({
            currentMode: "editingShareable",
            currentPopup: this.state.selectedShareable.type,
        });
    }

    postShareable(newShareable) {
        fetch("/shareable", {
            method: "post",
            body: JSON.stringify(newShareable),
            headers: { Accept: "application/json", "Content-Type": "application/json" },
        })
            .then(async (res) => {
                if (res.status === 200) {
                    const data = await res.json();
                    this.setState(
                        {
                            currentMode: "placingShareable",
                            selectedShareable: data,
                        },
                        () => this.computeXYOfSelectedShareable()
                    );
                } else {
                    throw new Error();
                }
            })
            .catch((err) => {
                this.setState({
                    currentMode: "error",
                    currentPopup: "error",
                    errorMessage:
                        "Guests may not upload images! Please sign in if you'd like to use all features of the site.",
                    selectedShareable: {
                        center: { lat: 1000, lng: 1000 },
                        content: "",
                        user: null,
                        type: null,
                    },
                });
            });
    }

    patchSelectedShareable() {
        const req = {
            method: "PATCH",
            headers: {
                Accept: "application/json",
                content: "application/json",
            },
        };

        req.body =
            this.state.selectedShareable.type === "image"
                ? this.state.currentImageForm
                : new FormData();
        Object.entries(this.state.selectedShareable).forEach(([k, v]) =>
            req.body.append(k, typeof v === "object" ? JSON.stringify(v) : v)
        );

        fetch(`/shareable/${this.state.selectedShareable._id}`, req)
            .then((res) => {
                if (res.status === 200) {
                    return res.json();
                }
            })
            .then((json) => {
                this.setState({ selectedShareable: json }, () => {
                    if (Object.keys(this.state.selectedShareable))
                        this.addToShareableArray(this.state.selectedShareable);
                });
            })
            .catch((err) => console.log(err));
    }

    deleteSelectedShareable() {
        const id = this.state.selectedShareable._id;

        fetch(`/shareable/${id}`, {
            method: "delete",
        })
            .then((res) => {
                if (res.status === 200) {
                    this.setState({
                        selectedShareable: {
                            center: { lat: 1000, lng: 1000 },
                            content: "",
                            user: null,
                            type: null,
                        },
                        shareablePopupPos: { x: -1000, y: -1000 },
                        shareables: this.state.shareables.filter((s) => s._id !== id),
                    });
                }
            })
            .catch((err) => console.log(err));
    }

    shareSelectedShareable() {
        this.setState({
            currentMode: "notification",
            currentPopup: "notification",
        });
    }

    reportMarkerState(){
        this.setState({
            currentMode: "report",
            currentPopup: "report",
        })
    }

    returnToApp(username) {
        this.props.history.push("/App");
        if (this.state.currentMode === "editingShareable") {
            this.patchSelectedShareable();
        }
        this.setState({
            currentMode: "normal",
            currentPopup: "",
            errorMessage: "",
        });

        if (this.state.currentUsername && !username) {
            fetch("/logout")
                .then((res) => res)
                .catch((err) => console.log(err));
        } else if ((username && typeof username === "string") || username === null) {
            this.setState({
                currentUser: username,
            });
        }
    }

    //filter all the article that is not type this.state.articleType
    selectArticleType() {
        if (this.state.articleType !== "All") {
            this.setState(
                {
                    shareables: this.state.shareables.filter(
                        (s) => s.article === this.state.articleType
                    ),
                    selectedShareable: {
                        center: { lat: 1000, lng: 1000 },
                        content: "",
                        user: null,
                        type: null,
                        article: "",
                    },
                },
                () => this.computeXYOfSelectedShareable()
            );
        }
    }

    setArticleType(type) {
        this.setState({
            articleType: type,
        });
    }

    getShareablesForCurrentDate() {
        // Fetch shareables for current date and update this.state.shareables
        fetch(`/shareables/${this.state.currentDate.toDateString()}`)
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    shareables: json,
                    shareablePopupPos: { x: -1000, y: -1000 },
                });
                this.selectArticleType();
            });
    }

    componentDidMount() {
        this.getShareablesForCurrentDate();
        fetch("/check-session")
            .then((res) => {
                if (res.status === 200) {
                    return res.json();
                }
            })
            .then((json) => {
                if (json && json.currentUser) {
                    this.setState({ currentUser: json.currentUser });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    renderPopup() {
        const MarkerMenuProps = {
            currentDate: this.state.currentDate,
            currentShareable: this.state.selectedShareable,
            updateCurrentDate: this.updateCurrentDate.bind(this),
            updateSelectedShareable: this.updateSelectedShareable.bind(this),

            minDate: appSettings.minDate,
            maxDate: appSettings.maxDate,

            returnToApp: this.returnToApp.bind(this),
            shouldClear: this.state.popupExit,
            onExit: () => this.setState({ popupExit: false }),
        };

        const ImageMenuProps = {
            currentDate: this.state.currentDate,
            currentShareable: this.state.currentShareable,
            updateCurrentDate: this.updateCurrentDate.bind(this),
            updateImageForm: this.updateImageForm.bind(this),

            minDate: appSettings.minDate,
            maxDate: appSettings.maxDate,

            returnToApp: this.returnToApp.bind(this),
            shouldClear: this.state.popupExit,
            onExit: () => this.setState({ popupExit: false }),
        };

        const UserStatusMenuProps = {
            onValidationSuccess: this.returnToApp.bind(this),
            shouldClear: this.state.popupExit,
            onExit: () => this.setState({ popupExit: false }),
        };

        const NotificationMenuProps = {
            shareShareable: undefined, // TODO: This should really be a server call
            currentUser: this.state.currentUser,
            returnToApp: this.returnToApp.bind(this),
            shouldClear: this.state.popupExit,
            selectedShareable: this.state.selectedShareable,
            onExit: () => this.setState({ popupExit: false }),
        };

        const NotificationIconProps = {
            user: this.state.currentUser,
            returnToApp: this.returnToApp.bind(this),
        };

        const ReportMenuProps = {
            reportMarker: undefined, // TODO: This should really be a server call
            selectedShareable: this.state.selectedShareable,
            returnToApp: this.returnToApp.bind(this),
            shouldClear: this.state.popupExit,
            onExit: () => this.setState({ popupExit: false }),
        };

        const ManageUsersProps = {
            // TODO: Inside of ManageUsers, make a call to the SERVER
            //deleteUser: this.deleteUser.bind(this), // TODO: This should really be a server call
        };

        const ManageReportsProps = {
            // TODO: Inside of ManageReports, make a call to the SERVER
            // deleteReportedShareable: this.deleteReportedShareable.bind(this),

            //add props here
        };

        switch (this.state.currentPopup) {
            case "marker":
                return <MarkerMenu {...MarkerMenuProps} />;
            case "image":
                return <ImageMenu {...ImageMenuProps} />;
            case "notification":
                return <NotificationMenu {...NotificationMenuProps} />;
            case "notificationView":
                return <NotificationIcon {...NotificationIconProps} />;
            case "report":
                return <ReportMenu {...ReportMenuProps} />;
            case "login":
                return <UserStatusMenu {...UserStatusMenuProps} />;
            case "manageUser":
                return <ManageUsers {...ManageUsersProps} />;
            case "manageReports":
                return <ManageReports {...ManageReportsProps} />;
            case "help":
                return HelpBox();
            case "error":
                return (
                    <div>
                        <h1>Error!</h1>
                    </div>
                );
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
            openLoginMenu: () => {
                this.props.history.push("/App/login");
                this.setState({ currentMode: "login", currentPopup: "login" });
            },
            logout: () => this.returnToApp(null),
            shouldClear: this.state.popupExit,
            onPopupExit: () => this.setState({ popupExit: false }),
        };

        const FilterProps = {
            //selectType: this.selectCallback.bind(this),
            selectType: this.setArticleType.bind(this),
            getShareable: this.getShareablesForCurrentDate.bind(this),
            //currentUser: this.state.currentUsername,
        };

        const MapsProps = {
            updateSelectedShareable: this.updateSelectedShareable.bind(this),
            currentUser: this.props.currentUser,
            bindMap: this.bindMap.bind(this),
            currentDate: this.state.currentDate,
            shareables: this.state.shareables,
            currentShareable: this.state.selectedShareable,
            addToShareableArray: this.addToShareableArray.bind(this),
            selectedType: this.state.selectedShareableType,
            inAddMode: this.state.currentMode === "placingShareable",
            onShareablePlaced: this.editShareable.bind(this),
            onZoomOrDrag: function () {
                this.setState({ shareablePopupPos: this.computeXYOfSelectedShareable() });
            }.bind(this),
        };

        const ShareablePopupProps = {
            shareable: this.state.selectedShareable,
            // 'editable' is NOT to be trusted; it's only used to decide
            // whether to include the shareable modification buttons or not.
            // The backend does the actual validation.
            editable: this.state.selectedShareable.user === this.state.currentUser,
            //editable: this.userCanEdit.bind(this),
            edit: this.editShareable.bind(this),
            delete: this.deleteSelectedShareable.bind(this),
            share: this.shareSelectedShareable.bind(this),
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
                    leftMenuView = (
                        <UserInfo
                            currentUser={this.state.currentUser}
                            shareables={this.state.shareables}
                        />
                    );
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

        return (
            <div
                className="App"
                style={{
                    ...dynamicStyles.cursor,
                    backgroundColor: Colors.backgroundDarkAccent,
                }}>
                <SiteHeader>
                    <span className="current-date">
                        <i className="fas fa-calendar-alt"></i>
                        {new Date(this.state.currentDate).toDateString()}
                    </span>
                    {this.state.currentUser && (
                        <button onClick={this.renderNotification.bind(this)}>
                            <i className="fas fa-bell"></i>
                            Notifications
                        </button>
                    )}
                    <UserStatus {...UserStatusProps} />
                </SiteHeader>
                <div className="mainBody">
                    <CollapsibleMenu
                        views={["filter", "info"]}
                        currentView={this.state.currentLeftMenuView}
                        switchView={this.setLeftView.bind(this)}
                        position="left"
                        maxWidth="15%">
                        {leftMenuView}
                    </CollapsibleMenu>
                    <div className="outer-map-wrapper">
                        <div className="inner-map-wrapper">
                            {/* {this.state.showNotification && (
                                <NotificationIcon user={this.state.currentUser} />
                            )} */}
                            <Maps {...MapsProps}>
                                <ShareablePopup
                                    key={1}
                                    className="selected-shareable"
                                    style={dynamicStyles.selectedShareable}
                                    {...ShareablePopupProps}
                                />
                                {this.renderShareables()}
                            </Maps>
                        </div>
                        <div style={dynamicStyles.popupBox} className="popup-box">
                            <span onClick={this.returnToApp.bind(this)}>
                                <i className="fas fa-window-close"></i>
                            </span>
                            {this.renderPopup(this.state.currentPopup)}
                            <div className="errorMessage">{this.state.errorMessage}</div>
                        </div>
                        <PopoutButton position="bottom-right">
                            <MarkerIcon {...PopoutButtonIconProps} />
                            <ImageIcon {...PopoutButtonIconProps} />
                        </PopoutButton>
                    </div>
                    <CollapsibleMenu
                        views={["news", "tweets"]}
                        currentView={this.state.currentRightMenuView}
                        switchView={this.setRightView.bind(this)}
                        position="right"
                        maxWidth="25%">
                        {rightMenuView}
                    </CollapsibleMenu>
                </div>
                <div className="footer">
                    <Timeline {...TimelineProps} />
                    <div
                        className="footer-sideitem footer-sideitem-right"
                        onClick={() =>
                            this.setState({ currentMode: "help", currentPopup: "help" })
                        }>
                        <i class="fas fa-question-circle"></i>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(App);
