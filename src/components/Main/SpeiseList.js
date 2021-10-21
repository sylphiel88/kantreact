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
    const [chgVKMeal, setChgVKMeal] = useState(false)

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

    useEffect(()=>{
        axios.post("http://localhost:5000/api/v1/menu/vk",{vk: vollkost, soup: suppeVk})
    },[vollkost])

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

    function chgMealVKHandler() {
        setChgVKMeal(!chgVKMeal)
    }

    async function changeVK() {
        setVollkost(document.getElementById("changeVK").value)
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
                    {!chgVKMeal && <h4 onClick={chgMealVKHandler}>{vollkost}</h4>}{chgVKMeal && <input id="changeVK" type="text" className="chgMealVK" value={vollkost} onChange={changeVK}></input>}
                    <p className="soupStyle">Suppe: {suppeVk}<br />Dessert: {dessert}</p>
                </div>
            </div>
            <div className="card cardVG speisePlanPanelVG">
                <div className="card-divider dateSpVG">
                    <span class="spText">{date}</span>
                </div>
                <div className="card-section">
                    <h4>{vegetarisch}</h4>
                    <p className="soupStyle">Suppe: {suppeVg}<br />Dessert: {dessert}</p>
                </div>
            </div>
        </div>
    )
}

export default SpeiseList