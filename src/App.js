import React from "react";
import Draggable from "react-draggable";
import "./App.css";
import Colors from "./site-styles/Colors";
import SiteHeader from "./react-components/SiteHeader";
import Menu from "./react-components/Menu";
import Maps from "./react-components/Maps";
import Tweets from "./react-components/Tweets";
import Timeline from "./react-components/Timeline";
import AddContent from "./react-components/AddContent";
import PopoutButton from "./react-components/PopoutButton";

class App extends React.Component {
    state = {
        selectingLocation: false,
        x: 0,
        y: 0,
        txt: '',

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

    render() {
        const tempCircles = {
            background: Colors.background,
            width: 24,
            height: 24,
            borderRadius: 12,
        };
        return (
            <div className="App" style={{
                cursor: this.state.selectingLocation ? 'crosshair' : 'auto',
                }}>
                {this.checkTimeline.bind(this)}
                {this.checkTimeline()}
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
                        }}
                    >
                        <div style={{ position: "relative", width: "100%", height: "100%" }}>
                            {this.state.switchToAddContent ? (<>
                                <Maps 
                                    handler={this.state.selectingLocation}
                                    handleContentAdd={this.handleContentAdd.bind(this)}
                                    mm={this.state} />
                                <span ref={'temp'} style={{
                                    position: 'absolute',
                                    top: this.state.x,
                                    left: this.state.y,
                            }}>{this.state.txt}</span></>
                            ) : (
                                <AddContent state={this.state} />
                            )}
                        </div>
                        <PopoutButton position="top-right">
                            <span>test</span>
                        </PopoutButton>
                        <PopoutButton position="bottom-right">
                            <img style={{height:24, width:16}}src='/marker.png' onClick={() => {this.setState({selectingLocation: true})}}></img>
                            <span style={tempCircles} onClick={this.switchToAddContent.bind(this)}></span>
                            <span style={tempCircles}></span>
                            <span style={tempCircles} onClick={() => {this.setState({selectingLocation: true})}}></span>
                        </PopoutButton>
                    </div>
                    <Tweets f={this.handleCollapse} />
                </div>
                <Timeline changeTimeline={this.changeTimeline.bind(this)} />
            </div>
        );
    }

    handleCollapse() {
        requestAnimationFrame(() => {
            if (this.state.collapsed) {
                this.setState({ width: this.state.maximizedSize });
            } else {
                this.setState({ width: 0 });
            }
            this.setState({ collapsed: !this.state.collapsed });
        });
    }

    handleContentAdd() {
        // TODO: Pop up the appropriate window
        // Populate the state variable with the new marker once new menu option is done with.
        this.setState({selectingLocation: false});
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
    changeTimeline(time) {
        this.setState({ timeline: time });
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
