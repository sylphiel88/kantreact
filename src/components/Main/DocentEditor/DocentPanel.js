import React, {useState, useEffect} from "react";
import DocentPanelWrapper from "./DocentPanelWrapper.js";
import DocentDocsSelector from "./DocentDocsSelector";

function DocentPanel(props){
    return(
        <div>
            <DocentPanelWrapper>
                <DocentDocsSelector/>
            </DocentPanelWrapper>
        </div>
    )
}

export default DocentPanel