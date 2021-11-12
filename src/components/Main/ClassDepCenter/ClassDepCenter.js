import React, {useEffect, useState} from "react";
import DocentPanelWrapper from "../DocentEditor/DocentPanelWrapper";
import ClassCreator from "./ClassCreator";
import DepartmentCreator from "./DepartmentCreator";

function ClassDepCenter(props){

    const[open, setOpen] = useState(false)

    useEffect(()=>{
        if(!open){
            setOpen(true)
        }
    })

    function openHandler(){
        setOpen(false)
    }

    return (
        <div>
            {props.close && "Klassen / Abteilungen"}
            {!props.close &&
                <div>
                    <DocentPanelWrapper>
                        {open&&<ClassCreator open={open}/>}
                        <DepartmentCreator openHandler={openHandler}/>
                    </DocentPanelWrapper>
                </div>
            }
        </div>
    )
}

export default ClassDepCenter