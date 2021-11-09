import { ListItemSecondaryAction } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import DepList from "./DepList";

function DocentDocsSelector(props) {

    const [open, setOpen] = useState(false)
    const [docs, setDocs] = useState([])
    const [allDeps, setAllDeps] = useState([])
    const [docDeps, setDocDeps] = useState([])
    const [id, setId] = useState("")
    const [idchg, setIdchg] = useState(true)
    const [clsDep, setClsDep] = useState([])
    const [clsDoc, setClsDoc] = useState([])
    const [items, setItems] = useState([])
    const [clsIds, setClsIds] = useState([])

    useEffect(() => {
        if (open != true) {
            setOpen(true)
        }
    })

    useEffect(()=>{
        if(idchg==true){
            setIdchg(false)
        }
    },[idchg])

    useEffect(async () => {
        if(idchg==true){
        await axios.post(
            "http://localhost:5000/api/v1/class/getDocentsDepartments",
            { un: id },
            { header: { ContentType: "application/json" } }
        ).then(res => setDocDeps(res.data.deps))}
    }, [idchg])

    useEffect(async () => {
        await axios.post(
            "http://localhost:5000/api/v1/class/getDocentsDepartments",
            { un: id },
            { header: { ContentType: "application/json" } }
        ).then(res => setDocDeps(res.data.deps))
    }, [id])

    useEffect(async () => {
        await axios.get("http://localhost:5000/api/v1/class/getAllDepartments", { header: { ContentType: "application/json" } })
            .then(res => setAllDeps(res.data.deps))
    }, [docs])

    useEffect(async () => {
        await axios.get("http://localhost:5000/api/v1/class/getDocents", { header: { ContentType: "application/json" } })
            .then(res => setDocs(res.data.docs))
    }, [open])

    useEffect(async () => {
        if(idchg==true){
        await axios.post(
            "http://localhost:5000/api/v1/class/getDepsClasses",
            { deps: docDeps },
            { header: { ContentType: "application/json" } }
        ).then(res => {
            setClsDep(res.data.classes)
            setClsIds(res.data.ids)
        })}
    }, [idchg])

    useEffect(async () => {
        await axios.post(
            "http://localhost:5000/api/v1/class/getDepsClasses",
            { deps: docDeps },
            { header: { ContentType: "application/json" } }
        ).then(res => {
            setClsDep(res.data.classes)
            setClsIds(res.data.ids)
        })
    },[docDeps])

    useEffect(async () => {
        await axios.post(
            "http://localhost:5000/api/v1/class/getClassesOfDocent",
            { username: id },
            { header: { ContentType: "application/json" } }
        ).then(res => setClsDoc(res.data.classN))
    }, [id])

    function makeClass(x) {
        var ind = clsDep.indexOf(x)
        var id = clsIds[ind]
        var check = clsDoc.includes(x) ? "cardGreen" : "cardRed"
        return (
            <div className={"card cardUL carduser3 " + check} id={id} onClick={clickCls}>{x}</div>
        )
    }

    function makeItem(x, i) {
        if (i == 0 && id === "") {
            setId(x.un)
            return <option value={x.un} id={x.un}>{x.un}</option>
        } else {
            return <option value={x.un} id={x.un}>{x.un}</option>
        }
    }

    function changeHandler() {
        var val = document.getElementById('docsSelector').value
        if (val != "" && typeof (val) == "string") { setId(val) }
    }

    function makeCard(x) {
        var check = docDeps.includes(x) ? "cardGreen" : "cardRed"
        return (
            <div className={"card cardUL carduser3 " + check} id={x} onClick={(e) => clickDeps(e)}>
                {x}
            </div>
        )
    }

    async function clickDeps(e) {
        const clicked = e.target.id
        if (id != "" && docDeps.includes(clicked)) {
            await axios.post(
                "http://localhost:5000/api/v1/class/departmentDel",
                { doc: id, dep: clicked },
                { header: { ContentType: "application/json" } } 
            )
            var ind = docDeps.indexOf(clicked)
            docDeps.splice(ind,1)
        } else if (id != "") {
            await axios.post(
                "http://localhost:5000/api/v1/class/departmentUpd",
                { doc: id, dep: clicked },
                { header: { ContentType: "application/json" } }
            )
            docDeps.push(clicked)
        }
        setIdchg(true)
    }

    async function clickCls(e) {
        const clicked = e.target.id
        const cls = e.target.innerHTML
        if (id != "" && clsDoc.includes(cls)) {
            await axios.post(
                "http://localhost:5000/api/v1/class/classDel",
                { doc: id, cls: clicked },
                { header: { ContentType: "application/json" } } 
            )
            var ind = clsDoc.indexOf(cls)
            clsDoc.splice(ind,1)
        } else if (id != "") {
            await axios.post(
                "http://localhost:5000/api/v1/class/classUpd",
                { doc: id, cls: clicked },
                { header: { ContentType: "application/json" } }
            )
            clsDoc.push(cls)
        }
        setIdchg(true)
    }

    return (
        <div>
            {docs && <select id="docsSelector" onChange={changeHandler}>
                {docs.map((currElement, index) => makeItem(currElement, index))}
            </select>}
            <p>Abteilungen</p>
            {docDeps && allDeps.map(makeCard)}
            <p>Klassen</p>
            {(typeof (clsDep)!="undefined" && typeof (clsDoc)!="undefined")?clsDep.map(makeClass):null}
        </div>
    )
}

export default DocentDocsSelector