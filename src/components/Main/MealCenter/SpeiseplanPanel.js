import React, { useEffect, useState } from "react"
import SpeiseplanService from "../../../services/speiseplan"
import SpeiseList from "./SpeiseList"

function SpeiseplanPanel(props) {

    const [open, setOpen] = useState(false)
    const [speisen, setSpeisen] = useState(false)
    const [update, setUpdate] = useState(false)

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
        console.log(open)
        if (open === true) {
            await SpeiseplanService.getAll()
                .then(
                    response => setSpeisen(response.data)
                )
        }
        if(update===true){
            setUpdate(false)
        }
    }, [open, update])

    function setUpdateHandler(){
        setUpdate(true)
    }

    return (
        <div>
            {props.close && "Speiseplan"}
            {!props.close && <SpeiseList speisen={speisen} openState={open} updateHandler={setUpdateHandler} />}
        </div>
    )
}

export default SpeiseplanPanel