import React from 'react';
import './App.css';
import SiteHeader from './react-components/SiteHeader';
import Menu from './react-components/Menu';
import Maps from './react-components/Maps';
import Tweets from './react-components/Tweets';
import Timeline from './react-components/Timeline';
import AddContent from './react-components/AddContent';

class App extends React.Component {
    render(){
        return (
            <div className="App">
            <SiteHeader />
            <Menu f={this.handleCollapse}/>
            {/* This div was added due to an extra wrapper div being created by
              * the Maps component from google-maps-react. */}
            <div style={{ display: 'inline-block', flexGrow: 1, minWidth: '1px' }}>
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <Maps />
            </div>
            </div>
            <Tweets f={this.handleCollapse}/>
            <Timeline />

            </div>
        );
    }

    handleCollapse() {
        if (this.state.collapsed) {
            this.setState({ width: this.state.maximizedSize });
        } else {
            this.setState({ width: 1 });
        }
        this.setState({ collapsed: !this.state.collapsed });
    }
}

export default App;
