import React from 'react';
import './App.css';
import SiteHeader from './react-components/SiteHeader';
import Menu from './react-components/Menu';
import Map from './react-components/Map';
import Tweets from './react-components/Tweets';
import Timeline from './react-components/Timeline';

class App extends React.Component {
  render(){
    return (
      <div className="App">
        <SiteHeader />
        <Menu />
        <Tweets />
        <Map />
        <Timeline />
        
      </div>
    );
  }
}

export default App;
