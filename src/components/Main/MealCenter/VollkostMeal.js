import React,{useEffect, useState} from "react";

function VollkostMeal(props) {

    return (
        <div className="card-section">
            <textarea id="changeVK" type="text" className="chgMealVK" rows="2" value={props.vollkost} onChange={props.changeVK}></textarea>
            <div className="soupStyle">
                <span style={{ float: "left" }}>Suppe: </span><input id="changeSVK" type="text" className="chgSVG" value={props.suppeVk} onChange={props.changeSoupVK}></input>
                <br />
                <span style={{ float: "left" }}>Dessert: </span><input id="changeDessert" type="text" className="chgD" value={props.dessert} onChange={props.changeDessert}></input>
            </div>
        </div>
    )
}

export default VollkostMeal