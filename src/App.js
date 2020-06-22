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
        <Menu />
        <div style={{ display: 'inline-block', flexGrow: 1 }}>
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <Maps />
            </div>
        </div>
        <Tweets />
        <Timeline />
        
      </div>
    );
  }
}

export default App;
