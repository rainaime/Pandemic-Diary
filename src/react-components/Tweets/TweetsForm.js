import React from "react";
import "./styles.css";

class TweetsForm extends React.Component {
    constructor(props) {
        super(props);

        this.inputRef = React.createRef();
    }

    render() {
        return (
            <div className="add_tweet_container">
                <input
                    ref={this.inputRef}
                    autoComplete={false}
                    id="tweet_context"
                    type="text"
                    name="new_tweet"
                    alt="add comments"
                />
                <button
                    className="addButton"
                    onClick={() => {
                        let formVal = this.inputRef.current.value;
                        if (formVal === "") {
                            return;
                        }
                        this.props.addNewTweet(formVal);
                        this.inputRef.current.value = "";
                    }}>
                    <i class="fas fa-plus"></i>
                    Add Tweet
                </button>
            </div>
        );
    }
}
export default TweetsForm;
