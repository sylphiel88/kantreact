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
                    <h3> Vollkost </h3>
                    {speisen.map((speise) => {
                        const datestyle = {
                            height: "10px",
                            color: "#F0F0F0",
                            paddingTop: "2px",
                            fontSize: "10pt",
                            backgroundColor: "#D94129"
                        };
                        const mealstyle = {
                            fontSize: "12pt",
                            fontWeight: "bold",
                        };
                        const cardstyle = {
                            height:"160px",
                            width: "300px",
                            margin: "-1px"
                        };
                        const soupstyle = {
                            fontSize:"10pt",
                            color:"#505050",
                            fontWeight:"lighter",
                            backgroundColor: "#DB8179",
                        }
                        const date = moment(`${speise.date}`).format('DD. MMMM YYYY');
                        const svk = `${speise.menu.soupvk}`
                        const mvk = `${speise.menu.mainvk}`
                        const dvk = `${speise.menu.dessert}`
                        return (
                            <div className="card" style={cardstyle}>
                                <div className="card-divider" style={datestyle}>
                                {date}
                                </div>
                                <div className="card-section" style={soupstyle}>
                                    <h4 style={mealstyle}>{mvk}</h4>
                                    <p >Suppe: {svk}<br/>Dessert: {dvk}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="vegetarisch">
                    <h3> Vegetarisch </h3>
                    {speisen.map((speise) => {
                        const datestyle = {
                            height: "10px",
                            color: "#3D3D3D",
                            paddingTop: "2px",
                            fontSize: "10pt",
                            backgroundColor: "#00D964",
                        };
                        const mealstyle = {
                            fontSize: "12pt",
                            fontWeight: "bold",
                        };
                        const cardstyle = {
                            height:"160px",
                            width: "300px",
                            margin: "-1px",
                        };
                        const soupstyle = {
                            fontSize:"10pt",
                            color:"#505050",
                            fontWeight:"lighter",
                            backgroundColor: "#30FC78",
                        }
                        const date = moment(`${speise.date}`).format('DD. MMMM YYYY');
                        const sv = `${speise.menu.soupv}`
                        const mv = `${speise.menu.mainv}`
                        const dv = `${speise.menu.dessert}`
                        return (
                            <div className="card" style={cardstyle}>
                                <div className="card-divider" style={datestyle}>
                                {date}
                                </div>
                                <div className="card-section" style={soupstyle}>
                                    <h4 style={mealstyle}>{mv}</h4>
                                    <p>Suppe: {sv}<br/>Dessert: {dv}</p>
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
