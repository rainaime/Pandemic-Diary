import React from "react";
import Colors from "../../site-styles/Colors";
import "./styles.css";

class CollapsibleMenu extends React.Component {
    state = {
        collapsed: false,
        maximizedSize: "20%",
    }

    handleCollapse() {
        if (this.state.collapsed) {
            this.setState({ width: this.state.maximizedSize });
        } else {
            this.setState({ width: 0 });
        }
        this.setState({ collapsed: !this.state.collapsed });
    }

    render() {
        const dynamicStyles = {
            container: {
                width: this.state.width,
                backgroundColor: Colors.background,
                color: Colors.textColorLight,
            },
        };

        return (
            <div className="collapsible-menu" style={dynamicStyles.container}>
                {this.props.children}
                <CollapseButton
                    position={this.props.position === "left" ? "right" : "left"}
                    collapsed={this.state.collapsed}
                    onClick={this.handleCollapse.bind(this)}
                />
            </div>
        );
    }
}

class CollapseButton extends React.Component {
    state = {
        hover: false,
    };

    render() {
        const buttonStyle = {
            left: "calc(100% - 6px)",
            transform: "none",
            backgroundColor: Colors.backgroundDarkAccent,
            color: this.state.hover ? Colors.textAccent1 : Colors.textColorLight,
        };

        if (this.props.position === "left") {
            buttonStyle.left = "-6px";
            if (this.props.collapsed) {
                buttonStyle.transform = "scaleX(-1)";
                buttonStyle.left = "calc(100% - 12px)";
            }
        } else {
            if (!this.props.collapsed) {
                buttonStyle.transform = "scaleX(-1)";
            } else {
                buttonStyle.transform = "none";
                buttonStyle.left = "calc(100%)";
            }
        }

        return (
            <div
                onClick={this.props.onClick}
                className="collapse-button"
                style={buttonStyle}
                onMouseEnter={() => this.setState({ hover: true })}
                onMouseLeave={() => this.setState({ hover: false })}>
                &#x276D;
            </div>
        );
    }
}

export default CollapsibleMenu;
