import React, {useState, useEffect} from "react";
import DocentPanelWrapper from "./DocentPanelWrapper.js";
import DocentDepsSelector from "./DocentDepsSelector";

function DocentPanel(props){
    return(
        <div>
            <DocentPanelWrapper>
                <DocentDepsSelector/>
            </DocentPanelWrapper>
        </div>
    )
}

export default DocentPanel