import React from "react";

function VegiMeal(props) {

    return (
        <div className="card-section">
            <textarea id="changeVG" type="text" className="chgMealVG" rows="2" value={props.vegetarisch} onChange={props.changeVegetarisch}></textarea>
            <div className="soupStyle">
                <span style={{ float: "left" }}>Suppe: </span><input id="changeSVG" type="text" className="chgSVG" value={props.suppeVg} onChange={props.changeSoupVG}></input>
                <br />
                <span style={{ float: "left" }}>Dessert: </span><input id="changeDessert" type="text" className="chgD" value={props.dessert} onChange={props.changeDessert}></input>
            </div>
        </div>
    )
}

export default VegiMeal