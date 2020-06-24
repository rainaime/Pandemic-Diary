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
        ref: this
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
                <SiteHeader />
                <div style={{width: '100%', minHeight: '1px', display: 'flex', flexGrow: 1}}>
                    <Menu f={this.handleCollapse} addContent={this.switchToAddContent} state={this.state}/>
                    {/* This div was added due to an extra wrapper div being created by
                      * the Maps component from google-maps-react. */}
                    <div style={{ position: 'relative', display: 'inline-block', flexGrow: 1, minWidth: '1px' }}>
                        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                            {this.state.switchToAddContent ? <Maps /> : <AddContent/>}
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
                <Timeline />
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
}


export default App;
