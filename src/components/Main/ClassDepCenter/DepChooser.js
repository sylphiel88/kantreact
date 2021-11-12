import React, {useEffect, useState} from "react";

function DepChooser(props){

    function makeOption(x){
        return <option id={x} value={x}>{x}</option>
    }

    return (
    <div>
        <select id="depSel" className={"classCreator selectorD "+props.cla} onChange={(e)=>props.handler(e.target.value)}>
            {props.deps.map(makeOption)}
        </select>
    </div>
    )
}

export default DepChooser