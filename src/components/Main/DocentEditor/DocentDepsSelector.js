import axios from "axios";
import React, {useState, useEffect} from "react";

function DocentDepsSelector(props){

    const [open, setOpen] = useState(false)
    const [deps, setDeps] = useState([])
    const [optDep, setOptDep] = useState("Fachinformatik")
    const [docents, setDocents] = useState([])

    useEffect(() => {
        if (open != true) {
            setOpen(true)
        }
    })

    useEffect(async ()=>{
        await axios.get("http://localhost:5000/api/v1/class/getAllDepartments",{header:{ContentType: "application/json"}})
        .then(res => setDeps(res.data.deps))
    },[open])
    
    useEffect(()=>{
        console.log(deps);
    },[deps])

    useEffect(async()=>{
        await axios({
            method:'post',
            url: "http://localhost:5000/api/v1/class/getDocentsFromDep",
            header:{ContentType: "application/json"},
            data:{dep:optDep}
        })
        .then(res => setDocents(res.data.doc))
    })

    function makeItem(x){
        return <option value={x} id={x}>{x}</option>
    }

    function selectorHandler(){
        setOptDep(document.getElementById("depsSelector").value)
    }

    return(
        <div>
            <select id="depsSelector" onChange={selectorHandler}>
                {deps.map(makeItem)}
            </select>
            <select id="docentSelector">
                {docents.map(makeItem)}
            </select>
        </div>
    )
}

export default DocentDepsSelector