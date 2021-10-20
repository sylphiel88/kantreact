import '../../index.css'
import React, { useState, useEffect } from "react"
import { useLocation } from 'react-router'
import SpeiseplanService from "../../services/speiseplan.js"
import moment from "moment"

const Speiseplan = props => {
    const [speisen, setSpeisen] = useState([]);
    useEffect(() => {
        holeSpeisen()
    }
    )

    const holeSpeisen = () => {
        SpeiseplanService.getAll()
            .then(res => {
                setSpeisen(res.data)
            })
            .catch(e => {
                console.log(e)
            }
            )
    }
    return (
        <div className="container">
            <br />
            <div>
                <div className="vollkost">
                    <h3 className="titelVK"> Vollkost </h3>
                    {speisen.map((speise) => {
                        const datestyle = {
                            height: "10px",
                            paddingTop: "2px",
                            fontSize: "10pt"
                        };
                        const mealstyle = {
                            fontSize: "12pt",
                            fontWeight: "bold",
                        };
                        const cardstyle = {
                            height: "160px",
                            width: "300px",
                            margin: "-1px"
                        };
                        const soupstyle = {
                            fontSize: "10pt",
                            fontWeight: "lighter"
                        }
                        const date = moment(`${speise.date}`).format('DD. MMMM YYYY');
                        const svk = `${speise.menu.soupvk}`
                        const mvk = `${speise.menu.mainvk}`
                        const dvk = `${speise.menu.dessert}`
                        return (
                            <div className="card cardVK">
                                <div className="card-divider dateSpVK">
                                    {date}
                                </div>
                                <div className="card-section" style={soupstyle}>
                                    <h4 style={mealstyle}>{mvk}</h4>
                                    <p >Suppe: {svk}<br />Dessert: {dvk}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="vegetarisch">
                    <h3 className="titelVG"> Vegetarisch </h3>
                    {speisen.map((speise) => {
                        const datestyle = {
                            height: "10px",
                            paddingTop: "2px",
                            fontSize: "10pt",
                        };
                        const mealstyle = {
                            fontSize: "12pt",
                            fontWeight: "bold",
                        };
                        const cardstyle = {
                            height: "160px",
                            width: "300px",
                            margin: "-1px",
                        };
                        const soupstyle = {
                            fontSize: "10pt",
                            fontWeight: "lighter",
                        }
                        const date = moment(`${speise.date}`).format('DD. MMMM YYYY');
                        const sv = `${speise.menu.soupv}`
                        const mv = `${speise.menu.mainv}`
                        const dv = `${speise.menu.dessert}`
                        return (
                            <div className="card cardVG">
                                <div className="card-divider dateSpVG">
                                    <span class="spText">{date}</span>
                                </div>
                                <div className="card-section" style={soupstyle}>
                                    <h4 style={mealstyle}>{mv}</h4>
                                    <p>Suppe: {sv}<br />Dessert: {dv}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div >
    )
}

export default Speiseplan
