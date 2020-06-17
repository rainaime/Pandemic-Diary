import React from "react";
import './styles.css';

import Tweet from './Tweet'
import TweetsForm from './TweetsForm'
import { addTweet } from './TweetQueue';

class Tweets extends React.Component {
    state = {
        tweets : [
            {
                tweetId: 0,
                content: "hello",
                username: "mark"
            },
            {
                tweetId: 1,
                content: "hello1",
                username: "steven"
            },
            {
                tweetId: 2,
                content: "hello2",
                username: "woojin"
            }
        ]
    }

    /* update tweet */

    render() {
        return(
            <div className='tweets'>
                <div style={inlineStyle}>
                    <h1 style={titleStyle}>Tweets</h1>
                </div>
                <div style={inlineStyle}>   
                    <h1 style={titleStyle}>News</h1>
                </div>

                <div className='tweet_container'>
                    {/* print a tweet component for every tweet */}
                    {this.state.tweets.map( (tweet) => (<Tweet tweet={tweet}/>))}
                </div>
                <div className='new_tweets'>
                    <TweetsForm tweetState= {this.state} addTweet = {() => addTweet(this)}></TweetsForm>
                </div>
            </div>
        );
    };
}

const inlineStyle = {
    display: 'inline-block',
    width: '50%'
    // marginBottom: '2px'
}
const titleStyle = {
    float: 'none',
    textAlign: 'center',
    marginBlockStart : '0',
    marginBlockEnd: '0',
    margin: '0',
    border: 'solid 1px'
}

export default Tweets;
