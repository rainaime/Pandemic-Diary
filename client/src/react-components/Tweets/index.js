import "./styles.css";
import React, { Component } from "react";

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
        maxId: 0,
        tweets: [
//            {
//                tweetId: 0,
//                content: "hello",
//                username: "mark",
//            },
//            {
//                tweetId: 1,
//                content: "hello1",
//                username: "steven",
//            },
//            {
//                tweetId: 2,
//                content: "hello2",
//                username: "woojin",
//            },
        ],
    };

    //get current time in string
    getCurrentTime() {
        const currTime = new Date().toLocaleString()
        return currTime
    }

    //add new tweet
    addNewTweet = async (tweet) => {
        if (this.props.user === null) {
            return;
        }
        //this is where we update new tweet to the serverr
//        this.setState({
//            maxId: this.state.maxId + 1,
//            tweets: [
//                ...this.state.tweets,
//                { tweetId: this.state.maxId + 1, content: tweet, username: this.props.user.username},
//            ],
//        });
        
        const currentTime = this.getCurrentTime()
        
        //add current time at the and to ensure every valuse is unique so we don't get E11000 error
        const username = this.props.user.username.concat('\\\\split@' + currentTime)
        const content = tweet.concat('\\\\split@' + currentTime)
        
        const newTweet = {username: username, content: content}

        const response = await fetch("http://localhost:5000/tweet", {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "manual",
            body: JSON.stringify(newTweet),
        }).then((res) => {
            console.log(res)
            console.log(res.body)
        })
        
        this.updateTweet(this);
    }

    //get tweet from server
    updateTweet = async (tweet) => {
        const response = await fetch("http://localhost:5000/tweet")
            .then(res => {
                if (res.status === 200) {
                    // return a promise that resolves with the JSON body
                    return res.json();
                }
            })
            .then(json => {
                let newTweets = []; 
                json.tweets.map(function (tweet) {
                    const username = tweet.username.split('\\\\split@')[0];//get rid of currenttime at the end
                    const content = tweet.content.split('\\\\split@')[0];//get rid of currenttime at the end
                    
                    const newTweet = {username: username, content: content}//the tweet we want user to see
                    newTweets.push(newTweet)
                })
                tweet.setState({tweets: newTweets})
            })
            .catch(error => {
                console.log(error);
            });
        
    }

    render() {
        console.log(this.state.maxId)
        console.log(this.state.tweets.length)
        if (this.props.user != null && this.state.maxId == this.state.tweets.length) {
            this.updateTweet(this)
            this.state.maxId += 1
        }
        return (
            <>
                <div className="tweet_container">
                    {/* print a tweet component for every tweet */}
                    {this.state.tweets.map((tweet, i, arr) => (
                        <Tweet key={i} tweet={tweet} isLast={i === arr.length - 1} />
                    ))}
                </div>
                <TweetsForm addNewTweet={this.addNewTweet.bind(this)} />
            </>
        );
    }
}

export default Tweets;
