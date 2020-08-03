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
            <a href={a.link} className="news-article">
                <p className="news-article-title">{a.title}</p>
                {a.content}
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
    /**
     * These articles are currently hardcoded in ./dummyArticles.
     * We'd fetch them from our server or some other source in Phase 2.
     */
    getArticles(date) {
        return dummyArticles[date];
    }

    render() {
        const currentDate = this.props.currentDate.toDateString();
        const articles = this.getArticles(currentDate);
        if (articles === undefined) {
            return null;
        } else {
            return (
                <div className="news-container">
                    {this.getArticles(currentDate).map((a, i) => (
                        <NewsArticle key={i} article={a} />
                    ))}
                </div>
            );
        }
    }
}

export default News;
