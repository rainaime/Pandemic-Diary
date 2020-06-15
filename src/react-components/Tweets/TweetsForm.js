import React from "react";
import './styles.css';
import index from './index.js';

class TweetsForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props;
        this.addNewTweet = this.addNewTweet.bind(this);
      }

    addNewTweet(){
        this.state.tweetState.tweets.push({
            tweetId: 0,
            content: "hello", 
            username: "new_tweet"
        });
        {console.log("this is index")}
        {console.log(this.props)}
    }

    render(){
        const {
            tweetState,
            addTweet,
          } = this.props;

        return (
            <div>
                <input id ="tweet_context" type='text' name='new_tweet' alt='add comments' />
                {tweetState.tweets.push({
                    tweetId: 0,
                    content: "hi",
                    username: "n"
                })}
                <button className="addButton" onClick={addTweet}> add tweet </button>
            </div>
        );
    }
}
export default TweetsForm;
