import React from "react";
import VgDate from "./VgDate";
import VegiMeal from "./VegiMeal";

function VegiCard(props) {
    return (
        <div className="card cardVG speisePlanPanelVG">
            <VgDate date={props.date}/>
            <VegiMeal   vegetarisch={props.vegetarisch}
                        suppeVg={props.suppeVg}
                        dessert={props.dessert}
                        changeSoupVG={props.changeSoupVG}
                        changeVegetarisch={props.changeVegetarisch}
                        changeDessert={props.changeDessert}
            />
        </div>
    )
}

export default VegiCard