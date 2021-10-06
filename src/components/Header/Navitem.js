import React, { Component } from "react"
import Dropdown from "./Dropdown"
import { Link, Router, Redirect, Route } from "react-router-dom"
import { IoMdLogIn } from "react-icons/io"
import history from "../../history"
import Login from "./Login"




export default class Navitem extends React.Component {
    constructor(props) {
        super(props)
        this.state = { open: false, logIn: false }
        this.handler = this.handler.bind(this)
        this.loginHandler = this.loginHandler.bind(this)
    }

    handler() {
        const path = this.props.location;
        console.log(path);
        this.setState({
            open: !this.state.open
        })
    }
    
    loginHandler() {
        if(this.state.logIn){
            document.getElementById("app").className = "blur"
            document.getElementById("footer").className = "blurfooter"
        } else {
            document.getElementById("app").className = "app "
            document.getElementById("footer").className = ""
        }
        this.setState({
            logIn: !this.state.logIn
        })
    }

    render() {
        if(this.state.logIn){
            document.getElementById("app").className = "blur"
            document.getElementById("footer").className = "blurfooter"
        } else {
            document.getElementById("app").className = "app "
            document.getElementById("footer").className = ""
        }
        if (this.state.open && this.props.nummer == "1") {
            console.log(this.state.open)
            this.setState({
                open: !this.state.open
            })
        }
        if (this.props.nummer == "1") {
            return (
                    <li>
                        <a href="#" className="icon-button" onClick={this.loginHandler}>
                            {this.props.icon}
                        </a>
                        {this.state.logIn && <Login handler={this.loginHandler} stateo={this.state.logIn} />}
                    </li>
                )
        } else {
            return (
                <li>
                    <a href="#" className="icon-button" onClick={this.handler}>
                        {this.props.icon}
                    </a>
                    {this.state.open && <Dropdown handler={this.handler} stateo={this.state.open} />}
                </li>
            )
        }
    }
}