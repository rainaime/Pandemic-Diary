import React from "react";
import Colors from "../../site-styles/Colors";
import "./styles.css";

import Tweet from "./Tweet";
import TweetsForm from "./TweetsForm";

class Tweets extends React.Component {
    state = {
        tweets: [
            {
                tweetId: 0,
                content: "hello",
                username: "mark",
            },
            {
                tweetId: 1,
                content: "hello1",
                username: "steven",
            },
            {
                tweetId: 2,
                content: "hello2",
                username: "woojin",
            },
        ],
        update: "",
    };

    setDisplay() {

    }

    render() {
        return (
            <>
                {/* <div className="options">
                    <button style={inlineStyle} value="filter" onClick={this.setDisplay.bind(this)}>
                        Filter
                    </button>
                    <button
                        style={inlineStyle}
                        value="user info"
                        onClick={this.setDisplay.bind(this)}>
                        User Info
                    </button>
                </div> */}
                <div>
                    <div style={inlineStyle}>
                        <h1 style={{ ...titleStyle, color: Colors.textAccent1 }}>Tweets</h1>
                    </div>
                    <div style={inlineStyle}>
                        <h1 style={{ ...titleStyle, color: Colors.textAccent1 }}>News</h1>
                    </div>
                </div>

                <div className="tweet_container">
                    {/* print a tweet component for every tweet */}
                    {this.state.tweets.map((tweet, i, arr) => (
                        <Tweet key={tweet.tweetId} tweet={tweet} isLast={i === arr.length-1}/>
                    ))}
                </div>
                    <TweetsForm tweetState={this.state} parentRef={this}></TweetsForm>
            </>
        );
    }
}

const inlineStyle = {
    display: "inline-block",
    width: "50%",
    // marginBottom: '2px'
};
const titleStyle = {
    float: "none",
    textAlign: "center",
    marginBlockStart: "0",
    marginBlockEnd: "0",
    margin: "0",
};

export default Tweets;
