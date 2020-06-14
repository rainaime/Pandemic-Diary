import React from "react";

class Tweet extends React.Component {
    render() {
        // deconstruct props.tweet here
        // const {}
        return(
            <div style={tweetBorder}>
                <h2 style={userStyle}>{this.props.tweet.username}</h2>
                <h3 style={tweetStyle}>{this.props.tweet.content}</h3>
            </div>
        );
    };
}

const tweetBorder = {
    borderTop: '1px solid grey',
	borderBottom: '1px solid grey'
}
const tweetStyle = {
    // textAlign: 'left'
    // padding: '4px'
}

const userStyle = {
    fontSize: '12px',
    textAlign: 'left',
    padding: '0.5em'
}
export default Tweet;
