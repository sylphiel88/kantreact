import React, { Component } from "react"
import Dropdown from "./Dropdown"
import Login from "./Login"
import { IoLogoAngular, IoPersonOutline } from "react-icons/io5";
import axios from 'axios'

export default class Navitem extends Component {
    constructor(props) {
        super(props)
        this.state = { open: false, logIn: false, loggedIn: false, usergr: "", user: "" }
        this.handler = this.handler.bind(this)
        this.loginHandler = this.loginHandler.bind(this)
        this.logged = this.loggedHandler.bind(this)
        this.logOutHandler = this.logOutHandler.bind(this)
        this.messageHandler = this.messageHandler.bind(this)
    }

    messageHandler(str) {
        this.props.messageHandler(str)
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

    logOutHandler() {
        this.setState({ loggedIn: false, login: false, user: "", usergr: "" })
        localStorage.removeItem('authorization');
        this.props.messageHandler("Erfolgreich ausgeloggt!")
        this.props.modalHandler(true)
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
            this.setState({
                open: !this.state.open
            })
        }
        if (this.props.nummer == "1") {
            let token = localStorage.getItem('authorization')
            if (!token) {
                return (
                    <li>
                        <a href="#" className="icon-button icon-button2" onClick={this.loginHandler}>
                            {this.props.icon}
                        </a>
                        {this.state.logIn && <Login messageHandler={this.props.messageHandler} modalHandler={this.props.modalHandler} handler={this.loginHandler} stateo={this.state.logIn} />}
                    </li>
                )
            } else {
                axios.get('http://localhost:5000/api/v1/user/isLoggedIn', {
                    headers: {
                        "authorization": token
                    }
                })
                    .then(response => {
                        if (!this.state.loggedIn && response.data.login) {
                            if (response.data.exp) {
                                this.setState({ loggedIn: false })
                            } else {
                                this.setState({ loggedIn: true, user: response.data.dec })
                            }
                        }
                        axios.get('http://localhost:5000/api/v1/user/usergroup', {
                            headers: {
                                "user": response.data.dec
                            }
                        }).then(response => {
                            this.setState({ usergr: response.data.ug })
                        })
                    })
                if (this.state.loggedIn) {
                    return (
                        <li>
                            <a href="#" className="icon-button icon-button2" onClick={this.logOutHandler} title={this.state.user}>
                                {this.state.usergr === "Administrator" ? <IoLogoAngular /> : ""}
                                {this.state.usergr === "Dozent" ? <IoPersonOutline /> : ""}
                            </a>
                        </li>
                    )
                } else {
                    return (
                        <li>
                            <a href="#" className="icon-button icon-button2" onClick={this.loginHandler}>
                                {this.props.icon}
                            </a>
                            {this.state.logIn && <Login messageHandler={this.props.messageHandler} modalHandler={this.props.modalHandler} handler={this.loginHandler} stateo={this.state.logIn} />}
                        </li>
                    )
                }
            }
        } else {
            return (
                <li>
                    <a href="#" className="icon-button icon-button1" onClick={this.handler}>
                        {this.props.icon}
                    </a>
                    {this.state.open && <Dropdown handler={this.handler} stateo={this.state.open} />}
                </li>
            )
        }
    }
}