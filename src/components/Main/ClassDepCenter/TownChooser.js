import React, {useEffect, useState} from "react";

function TownChooser(props){
    
    function makeOption(x){
        return <option id={x} value={x}>{x}</option>
    }

    return (
    <div>
        <select id="townSel" className={"classCreator selectorD townChooser "+props.cla} onChange={(e)=>props.handler(e.target.value)}>
            {props.citys.map(makeOption)}
        </select>
    </div>
    )
}

export default TownChooser