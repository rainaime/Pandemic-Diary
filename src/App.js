import React from "react";
import "./App.css";
import Colors from "./site-styles/Colors";
import SiteHeader from "./react-components/SiteHeader";
import Menu from "./react-components/Menu";
import Maps from "./react-components/Maps";
import Tweets from "./react-components/Tweets";
import Timeline from "./react-components/Timeline";
import PopoutButton from "./react-components/PopoutButton";
import { UserStatus, UserStatusMenu } from "./react-components/UserStatus";
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
    { username: "admin", password: "admin" },
    { username: "user", password: "user" },
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
        currentShareable: undefined,
        currentDate: new Date(),
        selectedDate: new Date(),
        selectedShareableType: null,
        currentPopup: "",
        idcounts: 1,
        currentUser: null,
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
            // return <MarkerMenu
            //     state={this.state.currentShareable}
            //     updateDate={this.updateSelectedShareableDate}
            //     enterPressed={this.setCurrentMode.bind(this)}/>;
            case "image":
                return <ImageMenu image={this.state.currentShareable} />;
            case "login":
                return (
                    <UserStatusMenu
                        updateCurrentUser={this.updateCurrentUser.bind(this)}
                        onSuccess={() => {this.setState({currentMode: "normal"})}}
                        addUser={(newUser) => {users.push(newUser)}}
                        users={users}
                    />
                );
            default:
                return null;
        }
    }

    render() {
        return (
            <div
                className="App"
                style={{
                    cursor: this.state.currentMode === "placingShareable" ? "crosshair" : "auto",
                }}>
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
                    <Menu f={this.handleCollapse} selectType={this.selectCallback.bind(this)} />
                    {/* outerMapDiv and innerMapDiv were added due to an extra wrapper div being created by
                     * the Maps component from google-map-react which conflict with flexboxes */}
                    <div className="outerMapDiv">
                        <div
                            style={{
                                ...this.popupBoxStyle,
                                visibility:
                                    this.state.currentMode === "normal" ||
                                    this.state.currentMode === "placingShareable"
                                        ? "hidden"
                                        : "visible",
                            }}
                            className="popupBox">
                            <span onClick={this.setCurrentMode.bind(this)}>
                                {/* onClick={() => {
                                    this.setState({ currentMode: "normal" });
                                }}> */}
                                x
                            </span>
                            {this.renderPopup(this.state.currentPopup)}
                        </div>
                        <div className="innerMapDiv">
                            <Maps
                                state={this.state}
                                currentDate={this.state.currentDate}
                                shareables={this.state.shareables}
                                currentShareable={this.state.currentShareable}
                                addToShareableArray={this.addToShareableArray.bind(this)}
                                updateSelectedShareable={(marker) =>
                                    this.setState({ selectedShareable: marker })
                                }
                                inAddMode={this.state.currentMode === "placingShareable"}
                                selectedType={this.state.selectedShareableType}
                                onShareablePlaced={this.onShareablePlaced.bind(this)}>
                                <div
                                    className="selectedMarker"
                                    style={{
                                        top: this.state.selectedShareable.y + 25,
                                        left: this.state.selectedShareable.x,
                                        backgroundColor: Colors.background,
                                        color: Colors.textColorLight,
                                    }}>
                                    <div>
                                        <h3
                                            style={{
                                                fontSize: "1.5vh",
                                                display: "inline",
                                                margin: "0",
                                                float: "left",
                                                paddingLeft: "10px",
                                            }}>
                                            {this.getShareableUser()}:{this.getMarkerDate()}
                                        </h3>
                                        <button
                                            className="deleteButton"
                                            style={this.userCanEdit()}
                                            onClick={() => {
                                                this.deleteMarker();
                                                // this.deleteMarker(this.state.selectedShareable);
                                            }}></button>
                                        <button
                                            className="editButton"
                                            style={this.userCanEdit()}
                                            onClick={this.editMarker.bind(this)}></button>
                                    </div>
                                    <div
                                        style={{
                                            borderTopStyle: "solid",
                                            borderTopWidth: 3,
                                            borderTopColor: Colors.textColorLight,
                                        }}>
                                        <span>{this.state.selectedShareable.content}</span>
                                    </div>
                                </div>
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
                    <Tweets f={this.handleCollapse} />
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

    updateArticleType(type) {
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
    }

    deleteMarker(shareable) {
        this.setState((prevState) => ({
            shareables: prevState.shareables.filter(
                (element) => element.id !== this.state.selectedShareable.id
            ),
        }));
        this.state.selectedShareable.x = -200;
        this.state.selectedShareable.y = -200;
    }

    updateSelectedShareableDate(shareable, date) {
        // shareable.date = date
        // this.setS
    }

    handleCollapse() {
        if (this.state.collapsed) {
            this.setState({ width: this.state.maximizedSize });
        } else {
            this.setState({ width: 0 });
        }
        this.setState({ collapsed: !this.state.collapsed });
    }

    setCurrentMode() {
        this.setState({ currentMode: "normal" });
    }

    updateCurrentUser(user) {
        this.setState({ currentUser: user });
        console.log(this.state.currentUser);
    }

    userCanEdit() {
        if (this.state.selectedShareable.user != this.state.currentUser) {
            if (this.state.currentUser != null && this.state.currentUser.username != "admin") {
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

    popupBoxStyle = {
        backgroundColor: Colors.background,
        color: Colors.textColorLight,
    };
}

export default App;
