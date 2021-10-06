import 'foundation-sites/dist/js/foundation'
import { render } from 'react-dom';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io'
import { Redirect, Switch, BrowserRouter, Route, Router } from "react-router-dom";
import Main from '../Main/Main';
import Register from '../Register/Register';
import Speiseplan from '../Speiseplan/Speiseplan';




// function useOutsideAlerter(ref, url) {
//     const [login, setLogin] = useState(true)
//     useEffect(() => {
//         function handleClickOutside(event) {
//             if (event.clientX < 710 || event.clientX > 1095 || event.clientY < 260 || event.clientY > 463) {
//                 setLogin(false)
//                 console.log(url)
//             }
//         }
//         // Bind the event listener
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => {
//             document.removeEventListener("mousedown", handleClickOutside);
//         };
//     }, [ref]);
//     if (!login) {
//         let url2 = window.location.href
//         url2=url2.substr(url2.indexOf("?")+5)
//         console.log(url2);
//         document.getElementById('app').className="";
//         document.getElementById('footer').className="";
//         document.getElementById('login').className="noShow";
//         render(
//             <BrowserRouter>
//                 <Switch>
//                     <Redirect from='/login' push to={url2} />
//                     <Route path='/speiseplan'>
//                         <Speiseplan />
//                     </Route>
//                     <Route exact path='/'>
//                         <Main />
//                     </Route>
//                     <Route path='/register'>
//                         <Register />
//                     </Route>
//                 </Switch>
//             </BrowserRouter>
//             , document.getElementById('content')
//         );
//         setLogin(true)
//     }
// }



// export default function Login(props) {
//     const wrapperRef = useRef(null);
//     let url = props.url
//     useOutsideAlerter(wrapperRef, url);
//     const [eye, setEye] = useState(false);
//     let text
//     if (!eye) {
//         text = <div className="input-group "><input id='password' type="password" className="input-group-field inputl"></input><div className="input-group-label eyediv"><IoMdEye className="eye" onClick={() => setEye(!eye)} /></div></div>
//     } else {
//         text = <div className="input-group"><input id='password' type="text" className="input-group-field inputl"></input><div className="input-group-label eyediv"><IoMdEyeOff className="eye" onClick={() => setEye(!eye)} /></div></div>
//     }
//     return (
//         <div className="container">
//             <div className="login-feld-signin" id="login-feld">
//                 <div class="absolutf">
//                     <label for='username' style={{ color: "#f0f0f0" }}>Nutzername: </label>
//                     <input id='username' type="text" className="inputl"></input>
//                 </div>
//                 <br /><br /><br />
//                 <div class="absolutf">
//                     <label for='password' style={{ color: "#f0f0f0" }}>Passwort: </label>
//                     {text}
//                 </div>
//                 <br /><br /><br />
//             </div>
//         </div>
//     )
// }'

import React, { useState, useEffect, useRef, useCallback } from 'react';
import DropdownItem from './DropdownItem';
import { IoIosAddCircleOutline, IoMdPizza } from "react-icons/io"

export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.wrapperRef = React.createRef()
        this.state = { open: true, eye: false }
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.setEye = this.setEye.bind(this)
    }
    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }
    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    setEye() {
        this.setState({ eye: !this.state.eye })

    }

    changeOpen = () => {
        if (this.state.open == this.props.stateo) {
            this.setState({ open: !this.state.open })
            this.props.handler()
        }
    }

    handleClickOutside(event) {
        if (this.wrapperRef) {
            if ((event.clientX < 710 || event.clientX > 1150 || event.clientY < 260 || event.clientY > 800) && (event.clientX<1800 && event.clientY>50)) {
                this.changeOpen()
            }
        }
    }
    render() {
        let text = "";
        if (this.state.open == true) {
            if (!this.state.eye) {
                text = <div className="input-group "><input id='password' type="password" className="input-group-field inputl"></input><div className="input-group-label eyediv"><IoMdEye className="eye" onClick={() => this.setEye()} /></div></div>
            } else {
                text = <div className="input-group"><input id='password' type="text" className="input-group-field inputl"></input><div className="input-group-label eyediv"><IoMdEyeOff className="eye" onClick={() => this.setEye()} /></div></div>
            }
            return (
                <div className="login-feld-signin" id="login-feld">
                    <div class="absolutf">
                        <label for='username' style={{ color: "#f0f0f0" }}>Nutzername: </label>
                        <input id='username' type="text" className="inputl"></input>
                    </div>
                    <br /><br /><br />
                    <div class="absolutf">
                        <label for='password' style={{ color: "#f0f0f0" }}>Passwort: </label>
                        {text}
                    </div>
                    <br /><br /><br />
                </div>
            )
        } else {
            // document.getElementById("app").className = "app"
            // document.getElementById("footer").className = ""
            return null
        }
    }
}