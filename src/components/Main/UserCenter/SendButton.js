import React from "react";

function SendButton(props){
    return(
        <input type="button" className="userSend" id="us" value="Absenden" onClick={props.setSendHandler}></input>
    )
}

export default SendButton