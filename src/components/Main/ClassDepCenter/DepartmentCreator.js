import axios from "axios";
import React, { useState, useEffect } from "react";
import DepCreatorInput from "./DepCreatorInput";
import DepCreatorSend from "./DepCreatorSend";
import DepTitle from "./DepTitle";

function DepartmentCreator(props) {

    const [open, setOpen] = useState(false)
    const [allDepsS, setAllDepsS] = useState([])
    const [allDepsL, setAllDepsL] = useState([])
    const [depL, setDepL] = useState("")
    const [depS, setDepS] = useState("")
    const [cla, setCla] = useState("greyBack")

    useEffect(async()=>{
        if(!open){
            await axios.get('http://localhost:5000/api/v1/class/getAllDepartmentsX',{header:{ContentType:"application/json"}})
            .then(res => setAllDepsL(res.data.deps))
            await axios.get('http://localhost:5000/api/v1/class/getAllDepartmentsS',{header:{ContentType:"application/json"}})
            .then(res => setAllDepsS(res.data.deps))
        }
        setOpen(true)
    })

    useEffect(async()=>{
        if(!open){
            await axios.get('http://localhost:5000/api/v1/class/getAllDepartmentsX',{header:{ContentType:"application/json"}})
            .then(res => setAllDepsL(res.data.deps))
            await axios.get('http://localhost:5000/api/v1/class/getAllDepartmentsS',{header:{ContentType:"application/json"}})
            .then(res => setAllDepsS(res.data.deps))
        }
        setOpen(true)
    },[open])

    useEffect(()=>{
        setCla(allDepsS.includes(depS) && allDepsL.includes(depL)?"redBack":((depS.length==2 && depL!="" && depS!="")?"greenBack":"greyBack"))
    },[depS, depL])

    useEffect(()=>{
        console.log(allDepsL,allDepsS);
    },[allDepsL],[allDepsS])

    async function depSHandler(e) {
        setDepS(e.target.value)
        if (allDepsS.includes(e.target.value)) {
            const ind = allDepsS.indexOf(e.target.value)
            setDepL(allDepsL[ind])
        } else {
            if(allDepsL.includes(document.getElementById('depLInput').value)){
                setDepL("")
                document.getElementById('depLInput').value=""
            }
        }
    }

    async function depLHandler(e) {
        setDepL(e.target.value)
        if (allDepsL.includes(e.target.value)) {
            const ind = allDepsL.indexOf(e.target.value)
            setDepS(allDepsS[ind])
        } else {
            if(allDepsS.includes(document.getElementById('depSInput').value)){
                setDepS("")
                document.getElementById('depSInput').value=""
            }
        }
        setCla(allDepsS.includes(depS) && allDepsL.includes(depL)?"redBack":(depS.length<2?"greyBack":"greenBack"))
    }

    async function onClickHandler(){
        if(cla=="greenBack"){
            await axios.post(
                'http://localhost:5000/api/v1/class/department',
                {
                    ds: depS,
                    dl: depL
                },
                {
                    header:{
                        ContentType:"application/json"
                    }
                }
            )
            
        setOpen(false)
        setTimeout(props.openHandler(),1500)
        setDepS("")
        setDepL("")
        } else if(cla=="redBack"){
            await axios.post(
                'http://localhost:5000/api/v1/class/departmentD',
                {
                    ds: depS
                },
                {
                    header:{
                        ContentType:"application/json"
                    }
                }
            ) 
            
        setOpen(false)
        setTimeout(props.openHandler(),1500)
        setDepS("")
        setDepL("")
        }
    }

    return (
        <div>
            <DepTitle text={cla=="redBack"?"Abteilung löschen":cla=="greenBack"?"Abteilung hinzufügen":"Fehler in der Eingabe"}/>
            <DepCreatorInput id = "depSInput" ListName="AbteilungenS" deps={allDepsS} onChg={async(e)=>depSHandler(e)} dep={depS} cls={"depCreatorS"}></DepCreatorInput>
            <DepCreatorInput id = "depLInput" ListName="AbteilungenL" deps={allDepsL} onChg={async(e)=>depLHandler(e)} dep={depL} cls={"depCreatorL"}></DepCreatorInput>
            <DepCreatorSend cla = {cla} onClick={onClickHandler}/>
        </div >
    )
}

export default DepartmentCreator