import React, {useState, useEffect} from "react";

function DocentPanelWrapper(props){
    return(
        <div className="docentPanelWrapper">
            {props.children}
        </div>
    )
}

export default DocentPanelWrapper