import React, { useEffect, useState } from "react"
import axios from "axios"
import SpeiseList from "./SpeiseList"

function SpeiseplanPanel(props) {

    const [open, setOpen] = useState(false)
    const [speisen, setSpeisen] = useState(false)

    useEffect(() => {
        if (open != true) {
            if (props.close != true) {
                setOpen(true)
            } else {
                setOpen(false)
            }
        }
    })

    useEffect(async () => {
        if (open === true || speisen===false) {
            await axios.get("http://localhost:5000/api/v1/menu",{header:{ContentType: "application/json"}})
                .then(
                    response => setSpeisen(response.data))
        }
    }, [open, speisen])
    
    function setUpdate(){
        setSpeisen(false)
    }

    return (
        <div>
            {props.close && "Speiseplan"}
            {!props.close && <SpeiseList speisen={speisen} openState={open} updateHandler={setUpdate}/>}
        </div>
    )
}

export default SpeiseplanPanel