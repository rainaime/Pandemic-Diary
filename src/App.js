import React from "react";
import "./App.css";
import Colors from "./site-styles/Colors";
import SiteHeader from "./react-components/SiteHeader";
import Maps from "./react-components/Maps";
import Menu from "./react-components/Menu";
import Tweets from "./react-components/Tweets";
import CollapsibleMenu from "./react-components/CollapsibleMenu";
import Timeline from "./react-components/Timeline";
import PopoutButton from "./react-components/PopoutButton";
import { UserStatus, UserStatusMenu } from "./react-components/UserStatus";
import ShareablePopup from "./react-components/ShareableComponents";
import { ImageIcon, ImageMenu } from "./react-components/ShareableComponents/Image";
import { MarkerIcon, MarkerMenu } from "./react-components/ShareableComponents/Marker";
import NotificationMenu from "./react-components/Menu/NotificationBar";

const appSettings = {
    minDate: new Date("December 1 2019"),
    maxDate: new Date("December 31 2020"),
};

const users = [
    { username: "admin", password: "admin", shareables: [], shared: [] },
    { username: "user", password: "user", shareables: [], shared: [] },
    { username: "user2", password: "user2", shareables: [], shared: [] },
];

class App extends React.Component {
    state = {
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

        switch (currentPopup) {
            case "marker":
                return <MarkerMenu {...MarkerMenuProps} />;
            case "image":
                return <ImageMenu {...ImageMenuProps} />;
            case "notification":
                return (
                    <NotificationMenu
                        shareShareable={this.shareShareable.bind(this)}
                        currentUser={this.state.currentUser}
                        currentMarker={this.state.selectedShareable}
                    />
                );
            case "login":
                return <UserStatusMenu {...UserStatusMenuProps} />;
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
            logout: () => this.setState({ currentUser: null }),
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

        return (
            <div className="App" style={dynamicStyles.cursor}>
                <SiteHeader>
                    <span className="currentDate">{this.state.currentDate.toDateString()}</span>
                    <UserStatus {...UserStatusProps} />
                </SiteHeader>

                <div className="mainBody">
                    <CollapsibleMenu position="left">
                        <Menu {...MenuProps} />
                    </CollapsibleMenu>

                    {/* outerMapDiv and innerMapDiv were added due to an extra wrapper div being created by
                     * the Maps component from google-map-react which conflict with flexboxes */}
                    <div className="outerMapDiv">
                        <div className="innerMapDiv">
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
                    <CollapsibleMenu position="right">
                        <Tweets />
                    </CollapsibleMenu>
                </div>
                <Timeline {...TimelineProps} />
            </div>
        );
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
        this.setState({ currentPopup: this.state.currentShareable.type });
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

    setCurrentMode() {
        this.setState({ currentMode: "normal" });
    }

    updateCurrentUser(user) {
        this.setState({ currentUser: user });
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
                console.log("user found");
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
