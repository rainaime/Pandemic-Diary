import React from "react";
import './styles.css';

class Article extends React.Component {

    render() {
        return (
            <div className="articleInput">
                <textarea className = "article"></textarea>
            </div>
        );
    }
}

export default Article;
