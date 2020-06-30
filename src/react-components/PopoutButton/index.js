import React from "react";
import Colors from "../../site-styles/Colors";

// PARAMETERS FOR BUTTON - Fixed regardless of position of the PopoutButton.
const childSettings = {
    distToChild: 64,
    childRadius: 8,
};

const containerStyles = {
    position: "absolute",
    height: 48,
    width: 48,
    distToViewport: 16,
    paddingTop: childSettings.distToChild,
    paddingLeft: childSettings.distToChild,
    backgroundClip: "content-box",
    zIndex: 20
};

const buttonStyles = {
    position: "absolute",
    right: 0,
    width: containerStyles.width,
    height: containerStyles.height,
    fontSize: 0.5 * containerStyles.height,
    lineHeight: containerStyles.height + "px",
    textAlign: "center",
    verticalAlign: "center",
    userSelect: "none",
    borderRadius: 0.5 * containerStyles.width,
    zIndex: 20,
    backgroundColor: Colors.background,
    color: Colors.textColorLight,
};

class PopoutButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hover: false,
        };
    }

    getChildPos(i) {
        const radius = childSettings.distToChild + containerStyles.width / 2;
        const nChildren = this.props.children.length;
        let angle;
        if (nChildren > 1) {
            angle = (Math.PI / 2 / (nChildren - 1)) * i;
        } else {
            angle = 45;
        }
        const ret = [Math.cos(angle) * radius, Math.sin(angle) * radius];
        if (this.props.position === "top-right") {
            ret[1] = -ret[1] + childSettings.distToChild;
        }
        return ret;
    }

    renderChildren() {
        return React.Children.toArray(this.props.children).map((child, i) => {
            const childPos = this.getChildPos(i);
            return React.cloneElement(child, {
                key: i.toString(),
                radius: childSettings.childRadius,
                pos: this.getChildPos(i),
                style: {
                    ...child.props.style,
                    position: "absolute",
                    right: this.state.hover ? childPos[0] : 16,
                    bottom: this.state.hover
                        ? childPos[1]
                        : this.props.position === "top-right"
                        ? containerStyles.distToViewport + childSettings.distToChild
                        : containerStyles.distToViewport,
                    transition: "all 0.3s",
                    userSelect: "none",
                    visibility: this.state.hover ? "visible" : "hidden",
                },
            });
        });
    }

    render() {
        // TODO: change these styles to allow for different locations on map
        // top: -childSettings.distToChild + 16,
        const popoutButtonStyles = {
            position: "absolute",
        };
        const buttonStylesCopy = Object.assign({}, buttonStyles);

        if (this.props.position === "top-right") {
            popoutButtonStyles.top = containerStyles.distToViewport;
            popoutButtonStyles.right = containerStyles.distToViewport;
            buttonStylesCopy.top = 0;
        } else if (this.props.position === "bottom-right") {
            popoutButtonStyles.bottom = containerStyles.distToViewport;
            popoutButtonStyles.right = containerStyles.distToViewport;
            buttonStylesCopy.bottom = 0;
        } else {
            return <span>INVALID PopoutButton POSITION</span>;
        }

        return (
            <div
                style={{ ...popoutButtonStyles, ...containerStyles }}
                onMouseEnter={() => this.setState({ hover: true })}
                onMouseLeave={() => this.setState({ hover: false })}
            >
                <span style={buttonStylesCopy}>+</span>
                {this.renderChildren()}
            </div>
        );
    }
}

export default PopoutButton;
