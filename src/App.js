import React from 'react';
import './App.css';
import Colors from './site-styles/Colors';
import SiteHeader from './react-components/SiteHeader';
import Menu from './react-components/Menu';
import Maps from './react-components/Maps';
import Tweets from './react-components/Tweets';
import Timeline from './react-components/Timeline';
import AddContent from './react-components/AddContent';
import PopoutButton from './react-components/PopoutButton';

class App extends React.Component {
    state = {
        switchToAddContent: 1,
        ref: this,
        articles:[],
        timeLine: '',
        articlePopUp: 0,
        articleToSend: {
            text: ''
        },
        dummy: 0
    }

    render() {
        const tempCircles = {
            background: Colors.background,
            width: 16,
            height: 16,
            borderRadius: 8
        }
        return (
            <div className="App">
                {this.checkTimeline.bind(this)}
                {this.checkTimeline()}
                <SiteHeader />
                <div style={{width: '100%', minHeight: '1px', display: 'flex', flexGrow: 1}}>
                    <Menu f={this.handleCollapse} addContent={this.switchToAddContent} state={this.state}/>
                    {/* This div was added due to an extra wrapper div being created by
                      * the Maps component from google-maps-react. */}
                    <div style={{ position: 'relative', display: 'inline-block', flexGrow: 1, minWidth: '1px' }}>
                        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                            {this.state.switchToAddContent ? <Maps state = {this.state}/> : <AddContent state = {this.state}/>}
                        </div>
                        <PopoutButton>
                            <span style={tempCircles}></span>
                            <span style={tempCircles}></span>
                            <span style={tempCircles}></span>
                            <span style={tempCircles}></span>
                        </PopoutButton>
                    </div>
                    <Tweets f={this.handleCollapse}/>
                </div>
                <Timeline state = {this.state} changeTimeLine = {this.changeTimeLine}/>
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

    // switched between map component and AddContents component
    switchToAddContent() {
        if(this.state.switchToAddContent === 1){
            this.setState({switchToAddContent: 0});
        }
        else{
            this.setState({switchToAddContent: 1});
        }
    }

    //change Time Line
    changeTimeLine(time, cur) {
        // console.log("works")
        cur.setState({timeLine: time});
        console.log(this.state.timeLine)
    }

    //check to see if there is a post with the given timeline
    checkTimeline() {
        // console.log("time line")
        // console.log(this.state.timeLine)
        for(let i =0; i < this.state.articles.length; i++){
            if (this.state.articles[i].date === this.state.timeLine){
                this.state.articlePopUp = 1;
                this.state.articleToSend.text = this.state.articles[i].text;
                break;
            }
            else{
                this.state.articlePopUp = 0;
            }
        }
        // console.log("time line end")
    }
}


export default App;
