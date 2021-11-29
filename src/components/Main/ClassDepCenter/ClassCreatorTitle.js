import React from "react";

function ClassCreatorTitle(props){
    return(
        <div className="ClassCreatorTitle">
            {(props.cla&&props.part)&&"Klasse Löschen"}
            {(props.cla&&!props.part)&&"Teilnehmerzahl ändern"}
            {!props.cla&&"Klasse Hinzufügen"}
        </div>
    )
}

export default ClassCreatorTitle