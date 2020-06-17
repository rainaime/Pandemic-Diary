import React from "react";
import './styles.css';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

const googleMap = {
    display: 'inline-block',
    position: 'relative',
    width: '60%',
    height: 'calc(100vh - 90px)'
};

class Maps extends React.Component {
    api_key = 'AIzaSyCEheP30PI_xivf3iqo6zpcaQ9zRBt558Y';

    render() {
        return(
            /*Here we used google map api */
            <div className="map">
                
                    <Map google={this.props.google} zoom={14} style={googleMap}>
        
                    <Marker onClick={this.onMarkerClick}
                            name={'Current location'} />

                    <InfoWindow onClose={this.onInfoWindowClose}>
                    </InfoWindow>
                    </Map>
                
            </div>
            /*Here we used google map api */
        );
    };
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyCEheP30PI_xivf3iqo6zpcaQ9zRBt558Y')
  })(Maps)
