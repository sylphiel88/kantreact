import React, {useState, useEffect} from "react";
import DocentPanel from "./DocentPanel.js"

function DocentEditor(props){
    return(
        <div>
            {props.close?"Dozenten":<DocentPanel/>}
        </div>
    )
}

export default DocentEditor