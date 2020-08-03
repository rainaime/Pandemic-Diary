import React from "react";

class ReportMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            reportMessage: "",
        };
    }

    inputRef = React.createRef();

    componentDidUpdate() {
        if (this.props.shouldClear) {
            this.inputRef.current.value = "";
            this.props.onPopupExit();
        }
    }

    render() {
        return (
            <>
                <h1 className="popupBox_title">Report Marker:</h1>
                <p className="popupBox_instructions">
                    You may report a marker that contains offensive content here. Enter a brief
                    message detailing what the issue with the marker is, and it will be handled by
                    our administrators.
                </p>
                <p className="popupBox_instructions">
                    Press "Enter" to submit the report when you're done.
                </p>
                <form>
                    <textarea
                        ref={this.inputRef}
                        className="text_area"
                        onChange={(e) => this.setState({ reportMessage: e.target.value })}
                        onKeyPress={(event) => {
                            //should probably notify the user that the report has been sent
                            if (event.key === "Enter") {
                                this.props.enterPressed();
                                this.props.reportMarker(
                                    this.state.reportMessage,
                                    this.props.currentUserUsername,
                                    this.props.shareable
                                );
                            }
                        }}></textarea>
                </form>
            </>
        );
    }
}

class ManageReports extends React.Component {
    renderReport(report) {
        return (
            <div>
                <div>Reported by {report.userReporting}</div>
                <div>Report Message: {report.message}</div>
                <div>Marker Content: {report.shareable.content}</div>
                <button onClick={() => this.props.deleteReportedShareable(report.shareable)}>Delete Report</button>
            </div>
        );
    }
    render() {
        return (
            <>
                <h1 className="popupBox_title">Reports</h1>
                <div className="reports">
                {this.props.reports.map((report) => this.renderReport(report))}
                </div>
            </>
        );
    }
}

export { ReportMenu, ManageReports };
