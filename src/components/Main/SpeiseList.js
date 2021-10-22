import React, { useEffect, useState } from "react"
import moment from "moment"
import 'moment/locale/de'
import { backdropUnstyledClasses } from "@mui/core"
import axios from "axios"

function SpeiseList(props) {

    const [open, setOpen] = useState(false)
    const [day, setDay] = useState(0)
    const [speisen, setSpeisen] = useState([])
    const [vollkost, setVollkost] = useState("")
    const [vegetarisch, setVegetarisch] = useState("")
    const [suppeVk, setSuppeVk] = useState("")
    const [suppeVg, setSuppeVg] = useState("")
    const [dessert, setDessert] = useState("")
    const [date, setDate] = useState("")
    const [upDate, setUpDate] = useState()
    const [wochentag, setWochentag] = useState("Montag")

    useEffect(() => {
        if (open != props.openstate) {
            setOpen(true)
        }
    })

    useEffect(() => {
        const today = new Date()
        setDay(today.getDay())
        setSpeisen(props.speisen)
    }, [open])

    useEffect(() => {
        speisen.map((speise, index) => {
            if (index == day - 1) {
                moment.locale('de')
                setDate(moment(speise.date).format('DD. MMMM YYYY'))
                setWochentag(moment(speise.date).format('dddd'))
                setVollkost(speise.menu.mainvk)
                setVegetarisch(speise.menu.mainv)
                setSuppeVk(speise.menu.soupvk)
                setSuppeVg(speise.menu.soupv)
                setDessert(speise.menu.dessert)
                setUpDate(speise.date)
            }
        })
    }, [day])

    useEffect(async () => {
        await axios.post("http://localhost:5000/api/v1/menu/update", { date: upDate, vk: vollkost, vg: vegetarisch, svk: suppeVk, svg: suppeVg, dessert: dessert })
            .then(setTimeout(() => { props.updateHandler() }, 500));
    }, [vollkost, dessert, suppeVk, vegetarisch, suppeVg])

    function wheelHandler(e) {
        if (e.deltaY === 100) {
            nextday()
        }
        if (e.deltaY === -100) {
            backday()
        }
    }
    function backday() {
        if (day > 1) {
            setDay(day - 1);
        }
    }

    function nextday() {
        if (day < 5) {
            setDay(day + 1);
        }
    }

    const changeVK = (event) => {
        if (event.key === 'Enter') {
            console.log("jop");
            setVollkost(document.getElementById("changeVK").value)
        }
    }

    async function changeSoupVK() {
        setSuppeVk(document.getElementById("changeSVK").value)
    }

    async function changeSoupVG() {
        setSuppeVg(document.getElementById("changeSVG").value)
    }

    async function changeVegetarisch() {
        setVegetarisch(document.getElementById("changeVG").value)
    }

    async function changeDessert() {
        setDessert(document.getElementById("changeDessert").value)
    }

    return (
        <div onWheel={(e) => wheelHandler(e)} style={{ width: "80vw", height: "70vh" }}>
            <div className="tagSpeisePlan">
                <input type="button" className="daysBackw" id="us" value="<" onClick={backday}></input>{wochentag}
                <input type="button" className="daysForw" id="us" value=">" onClick={nextday}></input>
            </div>
            <div className="card cardVK speisePlanPanelVK">
                <div className="card-divider dateSpVK">
                    {date}
                </div>
                <div className="card-section">
                    <textarea id="changeVK" type="text" className="chgMealVK" rows="2" value={vollkost} onKeyDown={changeVK}></textarea>
                    <p className="soupStyle">
                        <span style={{ float: "left" }}>Suppe: </span><input id="changeSVK" type="text" className="chgSVK" value={suppeVk} onChange={changeSoupVK}></input>
                        <br />
                        <span style={{ float: "left" }}>Dessert: </span><input id="changeDessert" type="text" className="chgD" value={dessert} onChange={changeDessert}></input>
                    </p>
                </div>
            </div>
            <div className="card cardVG speisePlanPanelVG">
                <div className="card-divider dateSpVG">
                    <span class="spText">{date}</span>
                </div>
                <div className="card-section">
                    <textarea id="changeVG" type="text" className="chgMealVG" rows="2" value={vegetarisch} onChange={changeVegetarisch}></textarea>
                    <div className="soupStyle">
                        <span style={{ float: "left" }}>Suppe: </span><input id="changeSVG" type="text" className="chgSVG" value={suppeVg} onChange={changeSoupVG}></input>
                        <br />
                        <span style={{ float: "left" }}>Dessert: </span><input id="changeDessert" type="text" className="chgD" value={dessert} onChange={changeDessert}></input>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SpeiseList