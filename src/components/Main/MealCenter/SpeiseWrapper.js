import React from "react";

function SpeiseWrapper(props) {
    return(
        <div onWheel={(e) => props.wheelHandler(e)} style={{ width: "80vw", height: "70vh" }}>
            {props.children}
        </div>
    )
}

export default SpeiseWrapper