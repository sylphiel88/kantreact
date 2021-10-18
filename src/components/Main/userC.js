import React, { useState, useEffect } from "react"
import axios from "axios"
import UserList from "./UserList"

const UserC = props => {

    const [page, chgPage] = useState(1)
    const [numPer, chgNumPer] = useState(9)
    const [pages, setPages] = useState(1)
    const [send, setSend] = useState(false)
    const [data, setData] = useState([])

    useEffect(async () => {
        axios.get('http://localhost:5000/api/v1/user/getCountUsers?perPage=' + numPer, { headers: { 'content-type': 'application/json' } })
            .then(response => setPages(response.data.pages))
    }, [numPer, send])

    useEffect(async () => {
        axios.get('http://localhost:5000/api/v1/user/notactivatedusers?page=' + page + '&perPage=' + numPer, { headers: { 'content-type': 'application/json' } })
            .then(response => setData(response.data))
    }, [page, numPer, send])

    useEffect(async () => {
        if (page > pages) { chgPage(pages) }
    }, [pages])

    useEffect(() => {
        getPages()
    })

    function getPages() {
        let data
        axios.get('http://localhost:5000/api/v1/user/getCountUsers?perPage=' + numPer, { headers: { 'content-type': 'application/json' } })
            .then(response => data = response.data.pages)
            .then(() => {
                if (data != pages) {
                    setPages(data)
                }
            })
    }

    function backButton() {
        chgPage(page - 1);
    }

    function nextButton() {
        chgPage(page + 1);
    }

    function setSendHandler() {
        chgPage(1)
        setSend(!send)
    }

    function chgSelectHandler() {
        chgNumPer(document.getElementById("selector").value)
    }

    return (
        <div>
            {!props.close &&
                <select onChange={chgSelectHandler} id="selector" className="selector">
                    <option value="9">9 Nutzer pro Seite</option>
                    <option value="16">16 Nutzer pro Seite</option>
                </select>}
            {!props.close && <UserList data={data} page={page} perPage={numPer} send={send} setSendHandler={setSendHandler} />}
            {pages > 1 && !props.close && <input type="button" className="pagesBackw" id="us" value="<" onClick={page === 1 ? null : backButton}></input>}
            {pages > 1 && !props.close && <label className="pages" id="us">{page + " / " + pages}</label>}
            {pages > 1 && !props.close && <input type="button" className="pagesForw" id="us" value=">" onClick={page === pages ? null : nextButton}></input>}
            {!props.close && <input type="button" className="userSend" id="us" value="Absenden" onClick={setSendHandler}></input>}
        </div>
    )
}

export default UserC