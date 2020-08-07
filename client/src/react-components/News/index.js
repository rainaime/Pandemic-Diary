import React from "react";
import "./styles.css";
import dummyArticles from "./dummyArticles";

/**
 * A NewsArticle to be displayed in the News container.
 *
 * Props:
 *  - article: Object that describes this article. Must have attributes:
 *      - title
 *      - content
 *      - link
 */
class NewsArticle extends React.Component {
    render() {
        const a = this.props.article;
        return (
            <a href={a.url} className="news-article">
                <p className="news-article-title">{a.title}</p>
                {a.description}
                {a.urlToImage ? <img src={a.urlToImage} alt={a.description} /> : null}
            </a>
        );
    }
}

/**
 * News panel to be displayed in a container.
 *
 * Props:
 *  - currentDate: the date to fetch news articles for.
 */
class News extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            articles: [],
        };
    }

    componentDidMount() {
        this.getArticles(this.props.currentDate);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.currentDate !== this.props.currentDate) {
            if (this.props.currentDate < new Date()) {
                this.getArticles(this.props.currentDate);
            }
        }
    }

    getArticles(date) {
        fetch(`/news?date=${date}`, {
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
        })
            .then((res) => {
                if (res.status === 200) {
                    return res.json();
                } else {
                    return [];
                }
            })
            .then((val) => {
                this.setState({
                    articles: val,
                });
                console.log(val);
            });
    }

    render() {
        return this.state.articles?.length ? (
            this.props.currentDate < new Date() ? (
                <div className="news-container">
                    {this.state.articles.map((a, i) => (
                        <NewsArticle key={i} article={a} />
                    ))}
                </div>
            ) : (
                "You can't view news from the future!"
            )
        ) : (
            "Loading articles..."
        );
    }
}

export default News;
