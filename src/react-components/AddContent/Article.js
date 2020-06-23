import React from "react";
import './styles.css';

class Article extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: '',
            font: ''
        }
    }

    //update text state whenever user leaves the textarea section
    textInput(e) {
        this.setState({text: e.target.value})
    }

    //font change

    render() {
        return (
            <div className="articleInput">
                <textarea className = "articleHeader" placeholder="Enter Header" onBlur={this.textInput.bind(this)}>
                </textarea>
                <textarea className = "article" placeholder="Enter your story..." onBlur={this.textInput.bind(this)}>
                </textarea>
            </div>
        );
    }
}

export default Article;
