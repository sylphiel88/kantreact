import React from "react"

function LoginFeld(props) {
    return (
        <div className={!props.signInloaded ? "login-feld-signin" : props.signUp ? "login-feld-signup" : "login-feld-signin-2"} id="login-feld">{props.children}</div>
    )
}

export default LoginFeld