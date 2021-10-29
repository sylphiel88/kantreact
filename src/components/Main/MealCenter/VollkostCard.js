import React from "react";
import VkDate from "./VkDate";
import VollkostMeal from "./VollkostMeal";

function VollkostCard(props) {
    return (
        <div className="card cardVK speisePlanPanelVK">
            <VkDate date={props.date}/>
            <VollkostMeal vollkost={props.vollkost} suppeVk={props.suppeVk} dessert={props.dessert} changeSoupVK={props.changeSoupVK} changeVK={props.changeVK} changeDessert={props.changeDessert}/>
        </div>
    )
}

export default VollkostCard