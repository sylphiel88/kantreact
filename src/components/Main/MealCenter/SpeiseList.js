import React, { useEffect, useState } from "react"
import moment from "moment"
import 'moment/locale/de'
import axios from "axios"
import SpeiseWrapper from "./SpeiseWrapper"
import PaginatorMeal from "./PaginatorMeal"
import VollkostCard from "./VollkostCard"
import VegiCard from "./VegiCard"

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

    async function changeVK() {
        setVollkost(document.getElementById("changeVK").value)
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
        <SpeiseWrapper wheelHandler={wheelHandler}>
            <PaginatorMeal backday={backday} nextday={nextday} wochentag={wochentag} />
            <VollkostCard date={date} vollkost={vollkost} changeVK={changeVK} suppeVk={suppeVk} changeSoupVK={changeSoupVK} dessert={dessert} changeDessert={changeDessert} />
            <VegiCard date={date} vegetarisch={vegetarisch} changeVegetarisch={changeVegetarisch} suppeVg={suppeVg} changeSoupVG={changeSoupVG} dessert={dessert} changeDessert={changeDessert} />
        </SpeiseWrapper>
    )
}

export default SpeiseList