import React from "react";
import './styles.css';

import Tweet from './Tweet'

class TweetsForm extends React.Component {
    render(){
        const {
            userName,
            tweetContent,
            handleChange
        } = this.props;

        return (
            <Grid className="tweet_form"> 
                <input>
                    name = "userName"
                    value = {userName}
                    onChange = {handleChange}
                </input>
                <input>
                    name = "tweetContent"
                    value = {tweetContent}
                    onChange = {handleChange}
                </input>
            </Grid>
        );
    }
}
export default TweetsForm;
