import React from "react"
function UserGroupButtonWrapper(props) {
    return (
        <div className="usergrButtonWrapper" onWheel={e => props.wheelHandler(e)}>{props.children}
        </div>)
}

export default UserGroupButtonWrapper