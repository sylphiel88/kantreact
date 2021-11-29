import React from "react";
import {IoIosArrowForward} from "react-icons/io"

function NextArrow(props){
    return <span onClick={props.handler}><IoIosArrowForward/></span>
}

export default NextArrow