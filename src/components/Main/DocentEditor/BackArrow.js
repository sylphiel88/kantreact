import React from "react";
import {IoIosArrowBack} from "react-icons/io"

function BackArrow(props){
    return <span onClick={props.handler}><IoIosArrowBack/></span>
}

export default BackArrow