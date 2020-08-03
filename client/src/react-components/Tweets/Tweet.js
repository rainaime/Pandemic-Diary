import React from "react";
import Colors from "../../site-styles/Colors";

/**
 * display tweets
 *
 * Props: 
 * - key: key value of this tweet
 * - tweet: tweet to display
 * - isLast: boolean to indicate if this is the last tweet
 */
class Tweet extends React.Component {
    render() {
        const dynamicStyles = {
            tweet: {
                borderTop: '1px solid ' + Colors.textColorLight,
                borderBottom: this.props.isLast ? '1px solid ' + Colors.textColorLight: null
            }
        }
        return(
            <div style={dynamicStyles.tweet}>
                <h2 className="username">{this.props.tweet.username}</h2>
                <h3 className="content">{this.props.tweet.content}</h3>
            </div>
        );
    };
}

export default Tweet;
