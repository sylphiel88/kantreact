import React from "react";

function BackButton(props){
    <input type="button" className="pagesBackw" id="us" value="<" onClick={props.page === 1 ? null : props.backButton}></input>
}

export default BackButton