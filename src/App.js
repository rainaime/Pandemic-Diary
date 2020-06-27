import React from "react";
import "./App.css";
import Colors from "./site-styles/Colors";
import SiteHeader from "./react-components/SiteHeader";
import Menu from "./react-components/Menu";
import Maps from "./react-components/Maps";
import Tweets from "./react-components/Tweets";
import Timeline from "./react-components/Timeline";
import PopoutButton from "./react-components/PopoutButton";
import ImageIcon from "./react-components/ShareableComponents/Image";
import MarkerIcon from "./react-components/ShareableComponents/Marker";

const markerIconStyle = {
    height: 24,
    width: 16,
};

class App extends React.Component {
    state = {
        inAddMode: false,
        shareables: [],
        selectedShareable: {
            x: 0,
            y: 0,
            content: "",
        },
        currentShareable: undefined,
        currentDate: new Date(),
        currentPopup: "",

        // TODO: I think some of these are unnecessary.
        switchToAddContent: 1,
        ref: this,
        articles: [],
        timeLine: "",
        articlePopUp: 0,
        articleToSend: {
            text: "",
        },
        dummy: 0,
    };

    renderPopup(currentPopup) {
        switch (currentPopup) {
            case "marker":
                return null;
            case "image":
                return <span>test</span>;
            default:
                return null;
        }
    }

    render() {
        return (
            <div
                className="App"
                style={{
                    cursor: this.state.inAddMode ? "crosshair" : "auto",
                }}>
                <SiteHeader />
                <div style={{ width: "100%", minHeight: "1px", display: "flex", flexGrow: 1 }}>
                    <Menu
                        f={this.handleCollapse}
                        addContent={this.switchToAddContent}
                        state={this.state}
                    />
                    {/* This div was added due to an extra wrapper div being created by
                     * the Maps component from google-maps-react. */}
                    <div
                        style={{
                            position: "relative",
                            display: "inline-block",
                            flexGrow: 1,
                            minWidth: "1px",
                        }}>
                        <div
                            style={{
                                position: "absolute",
                                width: "90%",
                                height: "90%",
                                backgroundColor: "red",
                                top: "5%",
                                left: "5%",
                                zIndex: 9999,
                                visibility:
                                    this.state.currentPopup === "" && !this.state.inAddMode
                                        ? "hidden"
                                        : "visible",
                            }}>
                            {this.renderPopup(this.state.currentPopup)}
                        </div>
                        <div style={{ position: "relative", width: "100%", height: "100%" }}>
                            <Maps
                                shareables={this.state.shareables}
                                selectedShareable={this.state.selectedShareable}
                                currentShareable={this.state.currentShareable}
                                addToShareableArray={this.addToShareableArray.bind(this)}
                                updateSelectedShareable={(marker) =>
                                    this.setState({ selectedShareable: marker })
                                }
                                inAddMode={this.state.inAddMode}
                                onContentAdded={this.onContentAdded.bind(this)}>
                                <span
                                    style={{
                                        position: "absolute",
                                        top: this.state.selectedShareable.y,
                                        left: this.state.selectedShareable.x,
                                    }}>
                                    {this.state.selectedShareable.content}
                                </span>
                            </Maps>
                        </div>
                        <PopoutButton position="bottom-right">
                            <MarkerIcon
                                style={markerIconStyle}
                                onClick={this.updateAddingStatus.bind(this)}
                            />
                            <ImageIcon
                                style={markerIconStyle}
                                onClick={this.updateAddingStatus.bind(this)}
                            />
                        </PopoutButton>
                    </div>
                    <Tweets f={this.handleCollapse} />
                </div>
                <Timeline updateCurrentDate={this.updateCurrentDate.bind(this)} />
            </div>
        );
    }

    addToShareableArray(shareable) {
        // We need to create a new shareables array to ensure ComponentDidUpdate receives correct props.
        this.setState({
            shareables: [...this.state.shareables, shareable],
        });
    }

    handleCollapse() {
        if (this.state.collapsed) {
            this.setState({ width: this.state.maximizedSize });
        } else {
            this.setState({ width: 0 });
        }
        this.setState({ collapsed: !this.state.collapsed });
    }

    updateAddingStatus(shareableType, popupType) {
        this.setState({
            inAddMode: true,
            currentShareable: shareableType,
        });
    }

    onContentAdded() {
        this.setState({ inAddMode: false });
        this.setState({
        });
    }

    updateCurrentShareable(shareableType) {
        this.setState({
            currentShareable: shareableType,
        });
    }

    // switched between map component and AddContents component
    switchToAddContent() {
        if (this.state.switchToAddContent === 1) {
            this.setState({ switchToAddContent: 0 });
        } else {
            this.setState({ switchToAddContent: 1 });
        }
    }

    //change Time Line
    updateCurrentDate(time) {
        this.setState({ currentDate: time });
    }

    //check to see if there is a post with the given timeline
    checkTimeline() {
        for (let i = 0; i < this.state.articles.length; i++) {
            if (this.state.articles[i].date === this.state.timeLine) {
                this.state.articlePopUp = 1;
                this.state.articleToSend.text = this.state.articles[i].text;
                break;
            } else {
                this.state.articlePopUp = 0;
            }
        }
    }
}

export default App;
