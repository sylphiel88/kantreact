import React from "react"

function UserGroupButton(props) {
    return (
        <label className={props.usergr == props.grpS ? "usergrButtonActive" : "usergrButton"} onClick={() => props.setUsergr(props.grpS)} title={props.grpL}>{props.grpB}</label>
    )
}

export default UserGroupButton