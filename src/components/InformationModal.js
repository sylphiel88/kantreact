import React, { useState, useEffect } from 'react'


function InformationModal(props) {
    const [open, setOpen] = useState(false)
    const [text, setText] = useState("")

    if (open != props.open) {
        setOpen(props.open)
    }

    if (text != props.text) {
        setText(props.text)
    }

    useEffect(() => {
        setTimeout(() => {
            setOpen(false)
            props.openHandler(false)
        }, 2000)
    }, [open]);
    
    return (
        open && <div className="InfoModal">{props.text}</div>
    )
}

export default InformationModal