import React from "react";
import "./styles.css";

class TweetsForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            text: "",
        };
    }

    componentDidMount() {
        this.getUserName.bind(this); //bind to this class
        this.getUserName(); //initialize the username
    }

    //use server call to get name of the user making this tweet later
    getUserName() {
        this.setState({ username: "Woojin" });
    }

    //update new Tweet by making servercall later
    addNewTweet(pstate, tstate, parent) {
        pstate.tweets.push({
            tweetId: 0,
            content: tstate.text,
            username: tstate.username,
        });
        parent.setState({ update: "1" });
    }

    //update the text in tweets when user leaves the input box
    textInput(e) {
        this.setState({ text: e.target.value });
    }

    render() {
        return (
            <div>
                <input
                    id="tweet_context"
                    type="text"
                    name="new_tweet"
                    alt="add comments"
                    onBlur={this.textInput.bind(this)}
                />
                <button
                    className="addButton"
                    onClick={() => {
                        this.addNewTweet(this.props.tweetState, this.state, this.props.parentRef); //add new tweet
                        document.getElementById("tweet_context").value = ""; //clear the input text when clicked
                    }}>
                    add tweet
                </button>
            </div>
        );
    }
}
export default TweetsForm;
