import React from "react";

function LoginButtonWrapper(props) {
    return (
        <div className={props.signUp ? "absolutf" : "absolutf2"}>
                {props.children}
        </div>
    )
}

export default LoginButtonWrapper