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
    const [post, setPost] = useState(false)

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
        
        if (post === true) {
            console.log(post,vollkost);
            await axios.post("http://localhost:5000/api/v1/menu/update", { date: upDate, vk: vollkost, vg: vegetarisch, svk: suppeVk, svg: suppeVg, dessert: dessert })
            .then(setPost(false))
            .then(props.updateHandler())    
        }
    }, [post])

    function wheelHandler(e) {
        if (e.deltaY === 100) {
            nextday()
            setTimeout(props.updateHandler(),500)
        }
        if (e.deltaY === -100) {
            backday()
            setTimeout(props.updateHandler(),500)
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
        setPost(true)
    }

    async function changeSoupVK() {
        setSuppeVk(document.getElementById("changeSVK").value)
        setPost(true)
    }

    async function changeSoupVG() {
        setSuppeVg(document.getElementById("changeSVG").value)
        setPost(true)
    }

    async function changeVegetarisch() {
        setVegetarisch(document.getElementById("changeVG").value)
        setPost(true)
    }

    async function changeDessert() {
        setDessert(document.getElementById("changeDessert").value)
        setPost(true)
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