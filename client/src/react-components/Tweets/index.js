import "./styles.css";
import React from "react";

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
        tweets: [],
    };

    componentDidMount() {
        this.updateTweet(this);
        this.setState({
            maxId: this.state.maxId + 1,
        });
        this.interval = setInterval(() => this.setState({ time: Date.now(), maxId: 0 }), 1000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    //get current time in string
    getCurrentTime() {
        const currTime = new Date().toLocaleString();
        return currTime;
    }

    //add new tweet
    addNewTweet(tweet) {
        if (this.props.user === null) {
            return;
        }

        const currentTime = this.getCurrentTime();

        if (this.props.user != null) {
            //add current time at the and to ensure every valuse is unique so we don't get E11000 error
            const username = this.props.user.concat("\\\\split@" + currentTime);
            const content = tweet.concat("\\\\split@" + currentTime);

            const newTweet = { username: username, content: content };

            fetch("http://localhost:5000/tweet", {
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
                this.updateTweet(this);
            });
        }
    }

    //get tweet from server
    updateTweet(tweet) {
        fetch("http://localhost:5000/tweet")
            .then((res) => {
                if (res.status === 200) {
                    // return a promise that resolves with the JSON body
                    return res.json();
                }
            })
            .then((json) => {
                tweet.setState({
                    tweets: json.tweets.map((t) => {
                        return {
                            username: t.username.split("\\\\split@")[0], // Get rid of current time at end
                            content: t.content.split("\\\\split@")[0], // Get rid of current time at end
                        };
                    }),
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <>
                <div className="tweet_container">
                    {/* print a tweet component for every tweet */}
                    {this.state.tweets.map((tweet, i, arr) => (
                        <Tweet key={i} tweet={tweet} isLast={i === arr.length - 1} />
                    ))}
                </div>
                {this.props.user ? (
                    <TweetsForm addNewTweet={this.addNewTweet.bind(this)} />
                ) : (
                    <div
                        style={{
                            height: "60px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                        Please sign in to use this feature.
                    </div>
                )}
            </>
        );
    }
}

export default Tweets;
