import React from "react";
import './styles.css';

class Article extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: '',
            date: 'Sun Feb 16 2020',
            font: ''
        }
    }

    DateInput(e) {
        this.setState({date: e.target.value})
    }

    //update text state whenever user leaves the textarea section
    textInput(e) {
        this.setState({text: e.target.value})
    }

    //submit Article that this user wrote
    //this is where server call happens
    submitAriticle(curr) {
        curr.props.state.articles.push(
            {
                date: curr.state.date,
                text: curr.state.text
            }
        )
        console.log(curr.props.state)
    }

    //font change

    render() {
        return (
            <div className="articleInput">
                <textarea className = "articleHeader" placeholder="Enter Header" onBlur={this.DateInput.bind(this)}>
                </textarea>
                <textarea className = "article" placeholder="Enter your story..." onBlur={this.textInput.bind(this)}>
                </textarea>
                <button onClick={() => {this.submitAriticle(this)}}>submit</button>
            </div>
        );
    }
}

export default Article;
