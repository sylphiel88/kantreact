import React,{useState, useEffect} from "react";

function DepSelector(props){
    function makeItem(x){
        return <option id={x} value={x}>{x}</option>
    }
    return(
        <div className={props.signUp ? "absolutf" : "absolutf2"}>
        <select id="depSelector" className="docentSel" onChange={props.changeHandler}>
            {props.deps.map(makeItem)}
        </select>
        </div>
    )
}

export default DepSelector