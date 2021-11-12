import React from "react";

function DepCreatorInput(props) {
    return ( 
    <div>
        <input maxLength={props.id=="depSInput"?"2":""} id = {props.id} type = "text" name = { props.ListName } list = { props.ListName }onChange = { async(e) => props.onChg(e) } value = { props.dep } className = { props.cls + " sel" } >
        </input>
        <datalist id = { props.ListName } className = "sel" > {props.deps.map(x => {
                return <option id = { x } value = { x } > { x } </option>
            })
        }
        </datalist>
    </div>
    )
}

export default DepCreatorInput