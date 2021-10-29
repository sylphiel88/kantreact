import React from "react";

function PerPageSelector(props) {
    return (
        <select onChange={props.chgSelectHandler} id="selector" className="selector">
            <option value="4">4 Nutzer pro Seite</option>
            <option value="9">9 Nutzer pro Seite</option>
            <option value="12" selected="selected">12 Nutzer pro Seite</option>
            <option value="16">16 Nutzer pro Seite</option>
            <option value="20">20 Nutzer Pro Seite</option>
        </select>
    )
}

export default PerPageSelector