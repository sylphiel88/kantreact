import React, {useState, useEffect} from 'react';
import {IoIosCheckmark} from "react-icons/io"


function DepCreatorSend(props){
    return <div className={"depSend "+props.cla}><IoIosCheckmark style={{height:"50px", width:"50px"}} onClick={props.onClick}/></div>
}

export default DepCreatorSend
