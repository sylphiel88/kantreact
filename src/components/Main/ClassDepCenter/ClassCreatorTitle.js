import React from "react";

function ClassCreatorTitle(props){
    return(
        <div className="ClassCreatorTitle">{props.cla?"Klasse Löschen":"Klasse hinzufügen"}</div>
    )
}

export default ClassCreatorTitle