import React, { Component } from "react"
import Dropdown from "./Dropdown"
import Login from "./Login"
import { IoLogoAngular } from "react-icons/io5";
import axios from 'axios'
import { responsiveFontSizes } from "@mui/material";

export default class Navitem extends React.Component {
    constructor(props) {
        super(props)
        this.state = { open: false, logIn: false, loggedIn: false }
        this.handler = this.handler.bind(this)
        this.loginHandler = this.loginHandler.bind(this)
        this.logged = this.loggedHandler.bind(this)
        this.logOutHandler = this.logOutHandler.bind(this)
    }

    handler() {
        this.setState({
            open: !this.state.open
        })
    }

    loggedHandler(bool) {
        this.setState({
            loggedIn: bool
        })
    }

    logOutHandler(){
        this.setState({loggedIn: false})
        localStorage.setItem('token',"")
    }

    loginHandler() {
        if (this.state.logIn) {
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
        if (this.state.logIn) {
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
            let token = localStorage.getItem('token')
            if (!token) {
                return (
                    <li>
                        <a href="#" className="icon-button" onClick={this.loginHandler}>
                            {this.props.icon}
                        </a>
                        {this.state.logIn && <Login handler={this.loginHandler} stateo={this.state.logIn} />}
                    </li>
                )
            } else {
                axios.get('http://localhost:5000/api/v1/user/isLoggedIn', {
                    headers: {
                        "x-access-token": token
                    }
                })
                    .then(response => {
                        if (!this.state.loggedIn) {
                            if(response.data.exp){
                                this.setState({ loggedIn: false })
                                
                            } else {
                                this.setState({ loggedIn: true })
                            }
                        }
                    })
                if (this.state.loggedIn) {
                    return (
                        <li>
                            <a href="#" className="icon-button" onClick={this.logOutHandler}>
                            <IoLogoAngular />
                            </a>
                        </li>
                    )
                } else {
                    return (
                        <li>
                            <a href="#" className="icon-button" onClick={this.loginHandler}>
                                {this.props.icon}
                            </a>
                            {this.state.logIn && <Login handler={this.loginHandler} stateo={this.state.logIn} />}
                        </li>
                    )
                }
            }
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