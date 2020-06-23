import React from "react";
import './styles.css';

class ArticleSetting extends React.Component {

    render() {
        return (
            <div className="articleSetting">
                <ul>
                    <li>
                        <select>
                            <option value="Arial">Arial</option>
                            <option value="hehe">he he</option>
                            <option value="Comic">Comic</option>
                        </select>
                    </li>
                    <li><button>bold</button></li>
                    <li>size</li>
                    <li>color</li>
                </ul>
            </div>
        );
    }
}

export default ArticleSetting;
