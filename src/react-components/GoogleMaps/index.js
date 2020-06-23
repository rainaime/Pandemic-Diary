import React from "react";
import './styles.css';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class Maps extends React.Component {
    api_key = 'AIzaSyCEheP30PI_xivf3iqo6zpcaQ9zRBt558Y';

    render() {
        return(
            /*Here we used google map api */
            <Map google={this.props.google} zoom={14} >
                <Marker onClick={this.onMarkerClick}
                name={'Current location'} />

                <InfoWindow onClose={this.onInfoWindowClose}>
                    <span></span>
                </InfoWindow>
            </Map>
            /*Here we used google map api */
        );
    };
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyCEheP30PI_xivf3iqo6zpcaQ9zRBt558Y')
})(Maps)
