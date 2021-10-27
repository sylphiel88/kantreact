import React, { Component } from "react"
import Dropdown from "./Dropdown"
import Login from "./Login"
import { IoLogoAngular, IoPersonOutline } from "react-icons/io5";
import axios from 'axios'
import Shadow from "./Shadow"
import ProfileCard from "./ProfileCard";

export default class Navitem extends Component {
    constructor(props) {
        super(props)
        this.state = { open: false, logIn: false, loggedIn: false, usergr: "", user: "", dropdown: false, profile: false}
        this.handler = this.handler.bind(this)
        this.loginHandler = this.loginHandler.bind(this)
        this.logged = this.loggedHandler.bind(this)
        this.logOutHandler = this.logOutHandler.bind(this)
        this.messageHandler = this.messageHandler.bind(this)
    }

    async componentDidUpdate(){
        if(this.state.dropdown===true && this.state.open===true && this.props.nummer==="1"){
            this.setState({open: false})
        }
        if(this.state.profile===true && this.state.open===true && this.props.nummer==="2"){
            this.setState({open: false})
        }
    }

    messageHandler(str) {
        this.props.messageHandler(str)
    }

    handler() {
        if(this.props.nummer=="1" && this.state.open ==false){
            this.setState({dropdown: false, profile: true})
        } 
        else if(this.props.nummer=="2" && this.state.open==false) {
            this.setState({dropdown: true, profile: false})
        }
        else{
            this.setState({dropdown: false, profile: false})
        } 
        this.setState({
            open: !this.state.open
        })
        console.log(this.state.open, this.state.dropdown,this.state);
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
        this.setState({
            logIn: !this.state.logIn
        })
    }

    render() {
        // else {
        //     document.getElementById("app").className = "app "
        //     document.getElementById("footer").className = ""
        // }
        if (this.props.nummer == "1") {
            let token = localStorage.getItem('authorization')
            if (!token) {
                return (
                    <li>
                        <a href="#" className="icon-button icon-button2" onClick={this.loginHandler}>
                            {this.props.icon}
                        </a>
                        {this.state.logIn && <div><Login messageHandler={this.props.messageHandler} modalHandler={this.props.modalHandler} handler={this.loginHandler} stateo={this.state.logIn} /><Shadow/></div>}
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
                            <a href="#" className="icon-button icon-button2" onClick={this.handler} title={this.state.user}>
                                {this.state.usergr === "Administrator" && <IoLogoAngular />}
                                {this.state.usergr === "Dozent" && <IoPersonOutline />}
                            </a>
                            {this.state.open && <div><Shadow/><div  className="profileBackground"></div><ProfileCard handler={this.handler} usergr={this.state.usergr} user={this.state.user} logOutHandler={this.logOutHandler} stateo={this.state.open} /></div>}
                        </li>
                    )
                } else {
                    return (
                        <li>
                            <a href="#" className="icon-button icon-button2" onClick={this.loginHandler}>
                                {this.props.icon}
                            </a>
                            {this.state.logIn && <div><Login messageHandler={this.props.messageHandler} modalHandler={this.props.modalHandler} handler={this.loginHandler} stateo={this.state.logIn} /><Shadow/></div>}
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