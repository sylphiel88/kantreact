import 'foundation-sites/dist/js/foundation'
import React,{useState, useEffect, useRef, useCallback} from "react"
import {IoMdEye, IoMdEyeOff} from 'react-icons/io'
import { Redirect, Router } from "react-router";


function useOutsideAlerter(ref, url) {
        const [login, setLogin] = useState(true)
        useEffect(() => {
        function handleClickOutside(event) {
            if (event.clientX<710 || event.clientX>1095 || event.clientY<260 || event.clientY>463) {
                setLogin(false)
                console.log(url)
                window.location.replace(`../${url}`)
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}


export default function Login(props) {
    const wrapperRef = useRef(null);
    let url = props.url
    useOutsideAlerter(wrapperRef,url);
    const [eye,setEye] = useState(false);
    const [login,setLogin] = useState(true);
    if(!login){
        console.log(login);
    }
    let text
    if(!eye){
        text = <div className="input-group "><input id='password' type="password" className="input-group-field inputl"></input><div className="input-group-label eyediv"><IoMdEye className="eye" onClick={() => setEye(!eye)}/></div></div>
    } else {
        text = <div className="input-group"><input id='password' type="text" className="input-group-field inputl"></input><div className="input-group-label eyediv"><IoMdEyeOff className="eye" onClick={() => setEye(!eye)}/></div></div>
    }
    document.getElementById('app').className ="blur"
    document.getElementById('footer').className = "blurfooter"
    return(
        <div className="container">
            <div className="login-feld-signin" id="login-feld">
                <div class="absolutf">
                    <label for='username' style={{color:"#f0f0f0"}}>Nutzername: </label>
                    <input id='username' type="text" className="inputl"></input>
                </div>
                <br/><br/><br/>
                <div class="absolutf">
                    <label for='password' style={{color:"#f0f0f0"}}>Passwort: </label>
                    {text}  
                </div>
                <br/><br/><br/>
            </div>
        </div>
    )
}