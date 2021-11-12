import React from "react";
import {IoIosCheckmark} from "react-icons/io"

function ClassCreatorSend(props){
    return <div className={"classCreator "+props.cla}><IoIosCheckmark style={{height:"50px", width:"50px"}} onClick={props.handler}/></div>
}

export default ClassCreatorSend