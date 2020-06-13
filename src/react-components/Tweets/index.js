import React from "react";
import './styles.css';

import Tweet from './Tweet'

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

    /* function to add new tweet */

    /* update tweet */

    render() {
        return(
            <div className='tweets'>
                <div style={titleStyle}> 
                    <h1>Tweets</h1>
                </div>
                <div style={titleStyle}>
                    <h1>News</h1>
                </div>

                {/* print a tweet component for every tweet */}
                {this.state.tweets.map( (tweet) => (<Tweet tweet={tweet}/>))}
            </div>
        );
    };
}

const titleStyle = {
    display: 'inline',
    textAlign: 'center',
    width : '50%',
    marginBlockStart : '0',
    marginBlockEnd: '0',
    margin: '0'
}

export default Tweets;
