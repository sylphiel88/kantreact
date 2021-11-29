import React from "react";

function NumParticipants(props){
    return <input className="classCreatorInp" type="number" id="anzPart" value={props.anz} onChange={props.handler}></input>
}

export default NumParticipants