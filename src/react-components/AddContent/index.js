import React from "react";
import './styles.css';
import Image from './Image';
import Ariticle from './Article';
import AriticleSetting from './ArticleSetting';

class AddContent extends React.Component {
    render() {
        return(
            <div className = "addContent">
                <Image/>
                <Ariticle />
                <AriticleSetting/>
            </div>
        );
    };
}

export default AddContent;
