import React from "react";

function PageNumber(props){
    return(
        <label className="pages" id="us">{props.page + " / " + props.pages}</label>
    )
}

export default PageNumber