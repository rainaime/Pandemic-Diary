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

const markerIconStyle = {
    height: 24,
    width: 16,
};

const appSettings = {
    minDate: new Date("December 1 2019"),
    maxDate: new Date("December 31 2020"),
};

const users = [
    { username: "admin", password: "admin", shareables: [] },
    { username: "user", password: "user", shareables: [] },
    { username: "user2", password: "user2" },
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
        selectedShareableType: null,
        currentPopup: "",
        idcounts: 1,
        currentUser: users[1],
    };

    renderPopup(currentPopup) {
        switch (currentPopup) {
            case "marker":
                return (
                    <MarkerMenu
                        state={this.state.currentShareable}
                        updateDate={this.updateShareableDate.bind(this)}
                        enterPressed={this.setCurrentMode.bind(this)}
                        updateArticleType={this.updateArticleType.bind(this)}
                        shareableDate={this.state.shareableDate}
                    />
                );
            case "image":
                return (
                    <ImageMenu
                        image={this.state.currentShareable}
                        currentShareable={this.state.currentShareable}
                    />
                );
            case "login":
                return (
                    <UserStatusMenu
                        updateCurrentUser={this.updateCurrentUser.bind(this)}
                        onSuccess={() => {
                            this.setState({ currentMode: "normal" });
                        }}
                        addUser={(newUser) => {
                            users.push(newUser);
                        }}
                        users={users}
                    />
                );
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

        return (
            <div className="App" style={dynamicStyles.cursor}>
                <SiteHeader>
                    {this.state.currentDate.toDateString()}
                    <UserStatus
                        currentUser={this.state.currentUser}
                        openLoginMenu={() => {
                            this.setState({ currentMode: "login", currentPopup: "login" });
                        }}
                        logout={() => {
                            this.setState({ currentUser: null });
                        }}
                    />
                </SiteHeader>
                <div className="mainBody">
                    {/*<Menu
                        f={this.handleCollapse}
                        selectType={this.selectCallback.bind(this)}
                        currentUser={this.state.currentUser}
                    />*/}
                    <CollapsibleMenu position="left" f={this.handleCollapse}>
                        <Menu selectType={this.selectCallback.bind(this)} currentUser={this.state.currentUser}/>
                    </CollapsibleMenu>
                    {/* outerMapDiv and innerMapDiv were added due to an extra wrapper div being created by
                     * the Maps component from google-map-react which conflict with flexboxes */}
                    <div className="outerMapDiv">
                        <div style={dynamicStyles.popupBox} className="popupBox">
                            <span onClick={this.setCurrentMode.bind(this)}>x</span>
                            {this.renderPopup(this.state.currentPopup)}
                        </div>
                        <div className="innerMapDiv">
                            <Maps
                                state={this.state}
                                currentDate={this.state.currentDate}
                                shareables={this.state.shareables}
                                currentShareable={this.state.currentShareable}
                                addToShareableArray={this.addToShareableArray.bind(this)}
                                updateSelectedShareable={(s) =>
                                    this.setState({ selectedShareable: s })
                                }
                                inAddMode={this.state.currentMode === "placingShareable"}
                                selectedType={this.state.selectedShareableType}
                                onShareablePlaced={this.onShareablePlaced.bind(this)}>
                                <ShareablePopup
                                    className="selectedShareable"
                                    style={dynamicStyles.selectedShareable}
                                    shareable={this.state.selectedShareable}
                                    editable={this.userCanEdit.bind(this)}
                                    edit={this.editMarker.bind(this)}
                                    delete={this.deleteMarker.bind(this)}
                                />
                            </Maps>
                        </div>
                        <PopoutButton position="bottom-right">
                            <MarkerIcon
                                style={markerIconStyle}
                                date={this.state.currentDate}
                                onClick={this.enterAddingMode.bind(this)}
                            />
                            <ImageIcon
                                style={markerIconStyle}
                                onClick={this.enterAddingMode.bind(this)}
                            />
                        </PopoutButton>
                    </div>
                    <CollapsibleMenu position="right" f={this.handleCollapse}>
                        <Tweets/>
                        </CollapsibleMenu>
                </div>
                <Timeline
                    minDate={appSettings.minDate}
                    currentDate={this.state.currentDate}
                    maxDate={appSettings.maxDate}
                    updateCurrentDate={this.updateCurrentDate.bind(this)}
                />
            </div>
        );
    }

    updateShareableDate(time) {
        time.setTime(time.getTime() + time.getTimezoneOffset() * 60 * 1000); //change from est to gmt
        this.state.currentShareable.updateDate(time);
    }

    updateArticleType() {
        this.setState({ selectedType: this.state.selectedType });
    }

    addToShareableArray(shareable) {
        shareable.id = this.state.idcounts;
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

    setCurrentMode() {
        this.setState({ currentMode: "normal" });
    }

    updateCurrentUser(user) {
        this.setState({ currentUser: user });
        console.log(this.state.currentUser);
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

    getMarkerDate() {
        if (this.state.selectedShareable != null && this.state.selectedShareable.date != null)
            return this.state.selectedShareable.date.toDateString();
    }

    selectCallback(type) {
        this.setState({ selectedShareableType: type });
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
