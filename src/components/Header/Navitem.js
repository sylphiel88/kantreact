import React from "react"
import Dropdown from "./Dropdown"

export default class Navitem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {open:false}
        this.handler = this.handler.bind(this)
    }

    handler() {
        const path = window.location.pathname;
        this.setState({
            open: !this.state.open
        })
    }
    render() {
        let url = window.location.pathname
        if(this.props.nummer=="1") {
            const path = window.location.pathname;
            if(path!="/login"){
                return (
                    <li>
                        <a href={'/login/?url=' + url} className="icon-button" onClick={this.handler}>
                            {this.props.icon}
                        </a>
                    </li>
            )} else {
                return (
                    <li>
                        <a href="#" className="icon-button" onClick={this.handler}>
                            {this.props.icon}
                        </a>
                    </li>
                    )
                }
        } else {
            return (
                <li>
                    <a href="#" className="icon-button" onClick={this.handler}>
                        {this.props.icon}
                    </a>
                    {this.state.open && <Dropdown handler={this.handler} stateo={this.state.open}/>}
                </li>
            )
        }
    }
}