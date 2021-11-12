import React, { useEffect, useState } from "react";

function YearChooser(props) {

    function makeOption(x) {
        if (x == props.year) {
            return <option id={x} value={x} selected="selected">{x}</option>
        }
        else {
            return <option id={x} value={x}>{x}</option>
        }
    }

return (
    <div>
        <select id="townSel" className={"classCreator selectorD townChooser "+props.cla} onChange={(e) => props.handler(e.target.value)}>
            {props.years.map(makeOption)}
        </select>
    </div>
)
}

export default YearChooser