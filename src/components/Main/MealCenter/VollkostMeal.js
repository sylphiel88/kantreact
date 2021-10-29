import React,{useState} from "react";

function VollkostMeal(props) {

    const [vollkost, setVollkost]=useState("")

    async function onChangeVK(e){
        const vk = await props.changeVK(e)
        setVollkost(vk)
    }

    return (
        <div className="card-section">
            <textarea id="changeVK" type="text" className="chgMealVK" rows="2" value={vollkost} onChange={async (e)=>onChangeVK(e)}></textarea>
            <p className="soupStyle">
                <span style={{ float: "left" }}>Suppe: </span><input id="changeSVK" type="text" className="chgSVK" value={props.suppeVk} onChange={props.changeSoupVK}></input>
                <br />
                <span style={{ float: "left" }}>Dessert: </span><input id="changeDessert" type="text" className="chgD" value={props.dessert} onChange={props.changeDessert}></input>
            </p>
        </div>
    )
}

export default VollkostMeal