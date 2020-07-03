import React from "react";
import "./styles.css";

import Tweet from "./Tweet";
import TweetsForm from "./TweetsForm";

/**
 * Used to display tweets
 *
 * Props: 
 * - currentUser: user currently logged in otherwise null
 */
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

    //add new tweet
    addNewTweet(tweet) {
        if (this.props.user === null) {
            return;
        }
        //this is where we update new tweet to the serverr
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
