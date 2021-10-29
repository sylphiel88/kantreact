import React from "react";

function PaginatorMeal(props) {
    return (
        <div className="tagSpeisePlan">
            <input type="button" className="daysBackw" id="us" value="<" onClick={props.backday}></input>{props.wochentag}
            <input type="button" className="daysForw" id="us" value=">" onClick={props.nextday}></input>
        </div>
    )

}

export default PaginatorMeal