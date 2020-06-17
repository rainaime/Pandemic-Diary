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
        <Tweets />
        <Maps />
        <Timeline />
        
      </div>
    );
  }
}

export default App;
