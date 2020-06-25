import React from 'react';
import Colors from '../../site-styles/Colors';
import './styles.css';

class PopoutButton extends React.Component {
    constructor(props) {
        super(props);

        this.distToChild = 64;
        this.childRadius = 8;

        this.state = {
            hover: false,
        }
    }

    getChildPos(i) {
        const radius = this.distToChild + 24;
        const angle = (Math.PI/2)/(this.props.children.length-1)*i;
        return [Math.cos(angle)*radius, Math.sin(angle)*radius];
    }

    renderChildren() {
        return (
            this.props.children.map((child, i) => {
                const childPos = this.getChildPos(i);
                return React.cloneElement(child, {
                    key: i.toString(),
                    radius: this.childRadius,
                    pos: this.getChildPos(i),
                    style: {...child.props.style,
                        position: 'absolute',
                        right: this.state.hover ? childPos[0] : 16,
                        bottom: this.state.hover ? childPos[1] : 16,
                        transition: 'all 0.3s',
                        visibility: this.state.hover ? 'visible' : 'hidden'
                    }
                });
            })
        );
    }

    render () {
        // TODO: change these styles to allow for different locations on map
        const popoutButtonStyles = {
            position: 'absolute',
            bottom: 16,
            right: 16,
        }
        return (
            <div style={{
                    position: 'absolute',
                    width: 48,
                    height: 48,
                    paddingTop: this.distToChild,
                    paddingLeft: this.distToChild,
                    backgroundClip: 'content-box',
                    ...popoutButtonStyles
                }}
                onMouseEnter={() => this.setState({hover: true})}
                onMouseLeave={() => this.setState({hover: false})}
            >
                <span style={{
                    position: 'absolute',
                    right: 0,
                    bottom: 0,
                    width: 48,
                    height: 48,
                    lineHeight: 48,
                    textAlign: 'center',
                    verticalAlign: 'center',
                    backgroundColor: Colors.background,
                    borderRadius: 24,
                    color: Colors.textColorLight,
                }}>dsa</span>
                {this.renderChildren()}
            </div>
        );
    }
}

export default PopoutButton;
