import React from 'react'

class ReportMenu extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            reportMessage: "",
        }
    }
    render() {
        return (
            <div>
                <h2>Report Marker:</h2>
                <form>
                    Report Message:
                    <br></br>
                    <textarea className="text_area"
                        onChange={
                            (e) => this.setState({reportMessage: e.target.value})
                        }
                        onKeyPress= {(event) => {
                            //should probably notify the user that the report has been sent
                            if (event.key === "Enter"){
                                this.props.enterPressed()
                                this.props.reportMarker(this.state.reportMessage, this.props.currentUserUsername, this.props.shareable)
                            }
                        }}>

                    </textarea>
                </form>
            </div>
        )
    }
}

class ManageReports extends React.Component{

    renderReport(report){
        return(
            <div>
                <div>Reported by {report.userReporting}</div>
                <div>Report Message: {report.message}</div>
                <div>Marker Content: {report.shareable.content}</div>
                <button onClick={this.props.deleteReportedShareable}>Delete Report</button>
            </div>
        )
    }
    render(){
        return(
            <div>
                <h2>Reports</h2>
                {this.props.reports.map((report) => this.renderReport(report))}
            </div>
        )
    }
}

export { ReportMenu, ManageReports }
