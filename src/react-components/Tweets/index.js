import React from "react";
import "./styles.css";

import Tweet from "./Tweet";
import TweetsForm from "./TweetsForm";

class Tweets extends React.Component {
    state = {
        maxId: 2,
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
    };

    addNewTweet(tweet) {
        if (this.props.user === null) {
            return;
        }
        this.setState({
            maxId: this.state.maxId + 1,
            tweets: [
                ...this.state.tweets,
                { tweetId: this.state.maxId + 1, content: tweet, username: this.props.user.username},
            ],
        });
    }

    render() {
        return (
            <>
                <div className="tweet_container">
                    {/* print a tweet component for every tweet */}
                    {this.state.tweets.map((tweet, i, arr) => (
                        <Tweet key={tweet.tweetId} tweet={tweet} isLast={i === arr.length - 1} />
                    ))}
                </div>
                <TweetsForm addNewTweet={this.addNewTweet.bind(this)} />
            </>
        );
    }
}

export default Tweets;
