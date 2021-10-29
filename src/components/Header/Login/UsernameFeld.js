import React from "react";

function UsernameFeld(props) {
    return (
        <div className={props.signUp ? "absolutf" : "absolutf2"}>
            <label for='username' style={{ color: "#f0f0f0" }}>Nutzername: </label>
            <input id='username' type="text" className="inputl" onChange={(event) => props.setUnHandler(event.target.value)} value={props.username}></input>
            <br /><br /><br />
        </div>
    )
}

export default UsernameFeld