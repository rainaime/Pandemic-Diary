import React from "react";
import Colors from '../../site-styles/Colors';
import CollapseButton from "../CollapseButton";
import './styles.css';

import Tweet from './Tweet'
import TweetsForm from './TweetsForm'

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
        ],
        collapsed: false,
        maximizedSize: '20%',
        update: ''
    }

    /* update tweet */
    update() {
        this.setState({update: '1'});
    }

    render() {
        return(
            <div className='tweets' style={{
                    width: this.state.width,
                    backgroundColor: Colors.background,
                    color: Colors.textColorLight,
                    borderLeftColor: Colors.backgroundLightAccent,
                    borderLeftWidth: 2,
                    borderLeftStyle: 'dotted'
                }}>
                <div>
                    <div style={inlineStyle}>
                        <h1 style={{...titleStyle, color: Colors.textAccent1}}>Tweets</h1>
                    </div>
                    <div style={inlineStyle}>   
                        <h1 style={{...titleStyle, color: Colors.textAccent1}}>News</h1>
                    </div>
                </div>

                <div className='tweet_container'>
                    {/* print a tweet component for every tweet */}
                    {this.state.tweets.map( (tweet) => (<Tweet tweet={tweet}/>))}
                </div>
                <div className='new_tweets'>
                    <TweetsForm tweetState= {this.state} parentRef={this} update={this.update}></TweetsForm>
                </div>
                <CollapseButton position='left' collapsed={this.state.collapsed} onClick={this.props.f.bind(this)}/>
            </div>
        );
    };
}

const inlineStyle = {
    display: 'inline-block',
    width: '50%'
    // marginBottom: '2px'
}
const titleStyle = {
    float: 'none',
    textAlign: 'center',
    marginBlockStart : '0',
    marginBlockEnd: '0',
    margin: '0',
}

export default Tweets;
