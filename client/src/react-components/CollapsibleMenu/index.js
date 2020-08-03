import React from "react";
import Colors from "../../site-styles/Colors";
import "./styles.css";

/**
 * A CollapsibleMenu, which can be used in any container to fill its full
 * height and 20% of its width when expanded, or no width when collapsed.
 *
 * Props: 
 * - views:         the 'modes' this can display
 * - switchView:    callback function to handle switching of views
 * - position:      which side of the parent container this is placed on
 * - children:      the view to be rendered in this container
 */
class CollapsibleMenu extends React.Component {
    state = {
        collapsed: false,
        maximizedSize: "15%",
    };

    /**
     * Handler method called when CollapseButton is clicked.
     */
    handleCollapse() {
        if (this.state.collapsed) {
            this.setState({ width: this.state.maximizedSize });
        } else {
            this.setState({ width: 0 });
        }
        this.setState({ collapsed: !this.state.collapsed });
    }

    /**
     * Render the companion views this CollapsibleMenu manages.
     */
    renderViews() {
        return this.props.views.map((view, i) => {
            let icon;
            switch (view) {
                case "filter":
                    icon = <i className="fas fa-filter"></i>;
                    break;
                case "info":
                    icon = <i className="fas fa-info"></i>;
                    break;
                case "tweets":
                    icon = <i className="fab fa-twitter"></i>;
                    break;
                case "news":
                    icon = <i className="fas fa-newspaper"></i>;
                    break;
                default: break;
            }
            return (
                <span
                    key={i}
                    onClick={() => {
                        this.props.switchView(view);
                    }}>
                    {icon}{view}
                </span>
            );
        });
    }

    render() {
        const dynamicStyles = {
            container: {
                width: this.state.width,
                backgroundColor: "#416E8E", //Colors.background,
                color: Colors.textColorLight,
            },
        };

        return (
            <div className="collapsible-menu" style={dynamicStyles.container}>
                    <div className="menu-views">
                    {this.renderViews()}
                </div>
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

/**
 * A CollapseButton which triggers an event in the parent CollapsibleMenu.
 *
 * Props:
 * - position:      the side on which this should be placed
 * - onClick:       callback function that triggers the event.
 */
class CollapseButton extends React.Component {
    state = {
        hover: false,
    };

    render() {
        const buttonStyle = {
            left: "calc(100% - 8px)",
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
