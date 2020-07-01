import React from "react";
import Colors from "../../site-styles/Colors";

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

const tweetBorder = {
    borderTop: '1px solid grey',
	borderBottom: '1px solid grey'
}

const userStyle = {
    fontSize: '12px',
    textAlign: 'left',
    padding: '0.5em'
}
export default Tweet;
