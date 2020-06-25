import React, { Component } from 'react'

export class Marker extends Component {
    constructor(props){
        super(props);

        this.state = {
            x: props.x,
            y: props.y,
            content: props.content,
            clicked: false
        }  
        this.markerRef = React.createRef();
    }

    getStyle(){
        return {position: "absolute", left: this.props.x, top: this.props.y, height: "2vh", width: "2vw"}
    }

    handleClick(e){
            console.log("marker clicked")
            if (this.state.clicked)
                this.setState({clicked: false})
            else    
                this.setState({clicked: true})

    }

    showContent(){

    }

    render() {
        // console.log(this.props.x)
        let content;
        if (this.state.clicked){
            content = <h1 style={{position: "absolute", left: this.state.x, top: this.state.y}}>{this.state.content}</h1>
        } else {
            content = null
        }
        return (
            <div>
                <img src={markerImg} style={this.getStyle()} onClick={this.handleClick.bind(this)}/>
                {content}
                
            </div>
        )
    }
}

export default Marker
