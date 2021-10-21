import React, { useEffect, useState } from "react"
import SpeiseplanService from "../../services/speiseplan"
import SpeiseList from "./SpeiseList"

function SpeiseplanPanel(props) {

    const [open, setOpen] = useState(false)
    const [speisen, setSpeisen] = useState(false)

    useEffect(() => {
        if (open != true) {
            if(props.close!=true) {
                setOpen(true)
            } else {
                setOpen(false)
            }
        }
    })

    useEffect(async () => {
        console.log(open)
        if (open === true) {
            await SpeiseplanService.getAll()
            .then(
                response => setSpeisen(response.data)
            )
    }}, [open])

    return (
        <div>
            {props.close && "Speiseplan"}
            {!props.close && <SpeiseList speisen={speisen} openState={open}/>}
        </div>
    )
}

export default SpeiseplanPanel