import React, { useState, useEffect } from "react";
import DepChooser from "./DepChooser";
import Hyphen from "./Hyphen";
import TownChooser from "./TownChooser";
import YearChooser from "./YearChooser";
import NumberText from "./NumberText";
import axios from "axios";
import ClassCreatorTitle from "./ClassCreatorTitle";
import ClassCreatorSend from "./ClassCreatorSend";
import moment from "moment"

function ClassCreator(props) {

    const [dep, setDep] = useState("IT")
    const [town, setTown] = useState("S")
    const [num, setNum] = useState(1)
    const [maxNum, setMaxNum] = useState(1)
    const [allNums, setAllNums] = useState([])
    const [year, setYear] = useState(21)
    const [deps, setAllDeps] = useState([])
    const [citys, setAllCitys] = useState([])
    const [open, setOpen] = useState(false)
    const [years, setYears] = useState([])
    const [allClasses, setClasses] = useState([])
    const [currClassInAllClass, setCurrClassInAllClass] = useState(false)
    const [className, setClassName] = useState("")
    const [clickSend, setClickSend] = useState(false)

    useEffect(async () => {
        console.log(props.open);
        if(!props.open){
            setOpen(false)
        }
        if (!open) {
            await axios.get("http://localhost:5000/api/v1/class/getAllDepartmentsS", { header: { ContentType: "application/json" } })
                .then(res => setAllDeps(res.data.deps))
            await axios.get("http://localhost:5000/api/v1/class/getAllCitysS", { header: { ContentType: "application/json" } })
                .then(res => setAllCitys(res.data.citys))
            await axios.get("http://localhost:5000/api/v1/class/getAllClassesNL", { header: { ContentType: "application/json" } })
                .then(res => setClasses(res.data.classes))
            await axios.post("http://localhost:5000/api/v1/class/getAllNums", { town: town, dep: dep, year: year }, { header: { ContentType: "application/json" } })
                .then(res => setAllNums(res.data.classes))
            var yearArr = []
            for (var i = -1; i < 2; i++) {
                yearArr.push(year + i)
            }
            setYears(yearArr)
        }
        setOpen(true)
    })

    useEffect(async () => {
        console.log(props.open);
        if(!props.open){
            setOpen(false)
            await axios.get("http://localhost:5000/api/v1/class/getAllDepartmentsS", { header: { ContentType: "application/json" } })
                .then(res => setAllDeps(res.data.deps))
            await axios.get("http://localhost:5000/api/v1/class/getAllCitysS", { header: { ContentType: "application/json" } })
                .then(res => setAllCitys(res.data.citys))
            await axios.get("http://localhost:5000/api/v1/class/getAllClassesNL", { header: { ContentType: "application/json" } })
                .then(res => setClasses(res.data.classes))
            await axios.post("http://localhost:5000/api/v1/class/getAllNums", { town: town, dep: dep, year: year }, { header: { ContentType: "application/json" } })
                .then(res => setAllNums(res.data.classes))
            var yearArr = []
            for (var i = -1; i < 2; i++) {
                yearArr.push(year + i)
            }
            setYears(yearArr)
        }
        setOpen(true)
    },[open])

    useEffect(async () => {
        await axios.get("http://localhost:5000/api/v1/class/getAllClassesNL", { header: { ContentType: "application/json" } })
            .then(res => setClasses(res.data.classes))
    }, [clickSend])

    useEffect(() => {
        var numb = num < 10 ? "0" + num : num
        setClassName(dep + "-" + town + "-" + year + "-" + numb);
    }, [allClasses])

    useEffect(() => {
        var numb = num < 10 ? "0" + num : num
        setClassName(dep + "-" + town + "-" + year + "-" + numb);
    }, [num, dep, town, year])

    useEffect(() => {
        if (allClasses.includes(className)) {
            setCurrClassInAllClass(true)
        } else {
            setCurrClassInAllClass(false)
        }
    }, [className, allClasses])

    useEffect(async () => {
        if (!open) {
            await axios.get("http://localhost:5000/api/v1/class/getAllCitysS", { header: { ContentType: "application/json" } })
                .then(res => setAllCitys(res.data.citys))
        }
        setOpen(true)
    })

    useEffect(() => {
        setYear(parseInt(moment().format('YY')))
    }, [dep, open, town])

    useEffect(async () => {
        await axios.post("http://localhost:5000/api/v1/class/getNum", {
            year: year,
            town: town,
            dep: dep
        },
            { header: { ContentType: "application/json" } })
            .then(res => setMaxNum(res.data.num))
    }, [year, town, dep, open])

    useEffect(async () => {
        if (clickSend){
            await axios.post("http://localhost:5000/api/v1/class/getNum", {
                year: year,
                town: town,
                dep: dep
            },
                { header: { ContentType: "application/json" } })
                .then(res => setMaxNum(res.data.num))
            await axios.get("http://localhost:5000/api/v1/class/getAllDepartmentsS", { header: { ContentType: "application/json" } })
                .then(res => setAllDeps(res.data.deps))
            await axios.get("http://localhost:5000/api/v1/class/getAllCitysS", { header: { ContentType: "application/json" } })
                .then(res => setAllCitys(res.data.citys))
            await axios.get("http://localhost:5000/api/v1/class/getAllClassesNL", { header: { ContentType: "application/json" } })
                .then(res => setClasses(res.data.classes))
            await axios.post("http://localhost:5000/api/v1/class/getAllNums", { town: town, dep: dep, year: year }, { header: { ContentType: "application/json" } })
                .then(res => setAllNums(res.data.classes))
            var yearArr = []
            for (var i = -1; i < 2; i++) {
                yearArr.push(year + i)
            }
            setYears(yearArr)
            setClickSend(false)
        }
    }, [clickSend])

    useEffect(async () => {
        if (num > maxNum) {
            setNum(maxNum)
        }
    }, [maxNum])

    async function sendHandler() {
        if (currClassInAllClass) {
            await axios.post(
                "http://localhost:5000/api/v1/class/classD",
                {
                    y: year,
                    cs: town,
                    ds: dep,
                    ns: num
                },
                { header: { ContentType: "application/json" } })
                .then(res=>setNum(res.data.num))
        } else {
            console.log("hier");
            await axios.post(
                "http://localhost:5000/api/v1/class/class",
                {
                    y: year,
                    cs: town,
                    ds: dep,
                    ns: num
                },
                { header: { ContentType: "application/json" } })
                .then(res=>setNum(res.data.num))
        }
        setClickSend(true)
    }

    function wheelHandler(e) {
        if (e.deltaY === 100) {
            if (num < maxNum) {
                setNum(num + 1)
            } else {
                setNum(maxNum)
            }
        }
        if (e.deltaY === -100) {
            if (num != 1) {
                setNum(num - 1)
            }
        }
    }

    return (
        <div className="classDepCreator">
            <ClassCreatorTitle cla={currClassInAllClass}/>
            <DepChooser handler={setDep} dep={dep} deps={deps}/>
            <Hyphen/>
            <TownChooser handler={setTown} town={town} citys={citys}/>
            <Hyphen/>
            <YearChooser handler={setYear} years={years} year={year}/>
            <Hyphen/>
            <NumberText num={num} wheelHandler={wheelHandler} />
            <ClassCreatorSend handler={sendHandler} cla={currClassInAllClass ? "redBack" : "greenBack"} />
        </div>
    )
}

export default ClassCreator