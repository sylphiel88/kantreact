import React from "react";

function ActivateCheckbox(props) {
    return (
        <div className="allUsersTA">Alle Nutzer auf dieser Seite aktivieren
            <input type="checkbox" className="allUsersChkbA" id="allUsersA" onChange={props.checkAllUsersA}></input>
        </div>
    )
}

export default ActivateCheckbox