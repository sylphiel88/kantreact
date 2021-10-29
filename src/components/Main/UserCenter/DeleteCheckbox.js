import React from "react";

function DeleteCheckbox(props) {
    return (
        <div className="allUsersTD">Alle Nutzer auf dieser Seite entfernen
            <input type="checkbox" className="allUsersChkbD" id="allUsersD" onChange={props.checkAllUsersD}></input>
        </div>
    )
}

export default DeleteCheckbox