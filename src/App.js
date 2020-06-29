import React from "react";
import "./App.css";
import Colors from "./site-styles/Colors";
import SiteHeader from "./react-components/SiteHeader";
import Menu from "./react-components/Menu";
import Maps from "./react-components/Maps";
import Tweets from "./react-components/Tweets";
import Timeline from "./react-components/Timeline";
import PopoutButton from "./react-components/PopoutButton";
import { ImageIcon, ImageMenu } from "./react-components/ShareableComponents/Image";
import { MarkerIcon, MarkerMenu } from "./react-components/ShareableComponents/Marker";

const markerIconStyle = {
    height: 24,
    width: 16,
};

class App extends React.Component {
    state = {
        currentMode: "normal",
        shareables: [],
        selectedShareable: {
            x: -200,
            y: -200,
            content: "",
        },
        currentShareable: undefined,
        currentDate: new Date(),
        currentPopup: "",
        idcounts: 1,
    };

    renderPopup(currentPopup) {
        switch (currentPopup) {
            case "marker":
                return <MarkerMenu state={this.state.currentShareable} 
                    updateDate={this.updateShareableDate.bind(this)}
                    shareableDate={this.state.shareableDate}/>;
            case "image":
                return <ImageMenu image={this.state.currentShareable} />;
            default:
                return null;
        }
    }

    render() {
        return (
            <div
                className="App"
                style={{
                    cursor:
                        this.state.currentMode === "normal" ||
                        this.state.currentMode === "editingShareable"
                            ? "auto"
                            : "crosshair",
                }}>
                <SiteHeader />
                <div className="mainBody">
                    <Menu f={this.handleCollapse} />
                    {/* These divs were added due to an extra wrapper div being created by
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
                            <span
                                onClick={() => {
                                    this.setState({ currentMode: "normal" });
                                }}>
                                x
                            </span>
                            {this.renderPopup(this.state.currentPopup)}
                        </div>
                        <div className="innerMapDiv">
                            <Maps
                                state={this.state}//
                                currentDate={this.state.currentDate}
                                shareables={this.state.shareables}
                                currentShareable={this.state.currentShareable}
                                addToShareableArray={this.addToShareableArray.bind(this)}
                                updateSelectedShareable={(marker) =>
                                    this.setState({ selectedShareable: marker })
                                }
                                inAddMode={this.state.currentMode === "placingShareable"}
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
                                        <button
                                            className="deleteButton"
                                            onClick={() => {
                                                this.deleteMarker();
                                            }}></button>
                                        <button
                                            className="editButton"
                                            onClick={this.editMarker.bind(this)}></button>
                                    </div>
                                    <div style={{borderTopStyle: 'solid', borderTopWidth: 3, borderTopColor: Colors.textColorLight}}>
                                        <span>{this.state.selectedShareable.content}</span>
                                    </div>
                                </div>
                            </Maps>
                        </div>
                        <PopoutButton position="bottom-right">
                            <MarkerIcon
                                style={markerIconStyle}
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
                <Timeline updateCurrentDate={this.updateCurrentDate.bind(this)} />
            </div>
        );
    }

    updateShareableDate(time){
        time.setTime(time.getTime()+time.getTimezoneOffset()*60*1000)//change from est to gmt
        this.state.currentShareable.updateDate(time)
    }

    addToShareableArray(shareable) {
        shareable.id = this.state.idcounts;
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
            shareables: prevState.shareables.filter((element) => element.id !== this.state.selectedShareable.id),
        }));
        this.state.selectedShareable.x = -200;
        this.state.selectedShareable.y = -200;
    }

    handleCollapse() {
        if (this.state.collapsed) {
            this.setState({ width: this.state.maximizedSize });
        } else {
            this.setState({ width: 0 });
        }
        this.setState({ collapsed: !this.state.collapsed });
    }

    //change Time Line
    updateCurrentDate(time) {
        time.setTime(time.getTime()+time.getTimezoneOffset()*60*1000)
        this.setState({ currentDate: time });
        this.setState({ selectedShareable: {
            x: -200,
            y: -200,
            content: "",
        }});
    }

    popupBoxStyle = {
        backgroundColor: Colors.background,
        color: Colors.textColorLight,
    };
}

export default App;
