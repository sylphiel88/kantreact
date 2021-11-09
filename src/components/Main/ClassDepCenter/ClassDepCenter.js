import React, {useEffect, useState} from "react";
import DocentPanelWrapper from "../DocentEditor/DocentPanelWrapper";
import ClassCreator from "./ClassCreator";
import DepartmentCreator from "./DepartmentCreator";

function ClassDepCenter(props){
    return (
        <div>
            {props.close && "Klassen / Abteilungen"}
            {!props.close &&
                <div>
                    <DocentPanelWrapper>
                        <ClassCreator/>
                        <DepartmentCreator/>
                    </DocentPanelWrapper>
                </div>
            }
        </div>
    )
}

export default ClassDepCenter