import React, { useState, useEffect } from "react"
import axios from "axios"
import UserList from "./UserList"

const UserC = props => {

    const [page, chgPage] = useState(1)
    const [numPer, chgNumPer] = useState(12)
    const [pages, setPages] = useState(1)
    const [send, setSend] = useState(false)
    const [data, setData] = useState([])
    const [search, setSearch] = useState("")

    useEffect(async () => {
        axios.get('http://localhost:5000/api/v1/user/getCountUsers?perPage=' + numPer + "&search=" + search, { headers: { 'content-type': 'application/json' } })
            .then(response => setPages(response.data.pages))
    }, [numPer, send, search])

    useEffect(async () => {
        axios.get('http://localhost:5000/api/v1/user/notactivatedusers?page=' + page + '&perPage=' + numPer + "&search=" + search, { headers: { 'content-type': 'application/json' } })
            .then(response => setData(response.data))
        document.getElementById("allUsersA").checked = false;
        document.getElementById("allUsersD").checked = false;
        checkAllUsersA()
        checkAllUsersD()
    }, [page, numPer, send, search])

    useEffect(async () => {
        if (page > pages) { chgPage(pages) }
    }, [pages])

    useEffect(() => {
        getPages()
    })


    useEffect(() => {
        getPages()
    }, [search])


    function getPages() {
        let data
        axios.get('http://localhost:5000/api/v1/user/getCountUsers?perPage=' + numPer + "&search=" + search, { headers: { 'content-type': 'application/json' } })
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

    function checkAllUsersA() {
        var bool = document.getElementById("allUsersA").checked
        document.getElementById("allUsersD").checked = false
        Array.from(document.getElementsByClassName("chkuser2")).forEach(function (card) {
            card.checked = bool;
        })
        Array.from(document.getElementsByClassName("chkuser3")).forEach(function (card) {
            card.checked = false;
        })
    }
    function checkAllUsersD() {
        var bool = document.getElementById("allUsersD").checked
        document.getElementById("allUsersA").checked = false
        Array.from(document.getElementsByClassName("chkuser3")).forEach(function (card) {
            card.checked = bool;
        })
        Array.from(document.getElementsByClassName("chkuser2")).forEach(function (card) {
            card.checked = false;
        })
    }


    function wheelHandler(e) {
        if (e.deltaY === 100) {
            if (page != pages) {
                nextButton()
            }
        }
        if (e.deltaY === -100) {
            if (page != 1) {
                backButton()
            }
        }
    }

    async function searchChange() {
        setSearch(document.getElementById("searchUsers").value)
    }

    return (
        <div className={props.close && "flex-center-div"} onWheel={(e) => wheelHandler(e)}>
            {props.close && "User-Kontrollzentrum"}
            {!props.close &&
                <select onChange={chgSelectHandler} id="selector" className="selector">
                    <option value="4">4 Nutzer pro Seite</option>
                    <option value="9">9 Nutzer pro Seite</option>
                    <option value="12" selected="selected">12 Nutzer pro Seite</option>
                    <option value="16">16 Nutzer pro Seite</option>
                    <option value="20">20 Nutzer Pro Seite</option>
                </select>}

            {!props.close && <div className="userlist"><UserList data={data} page={page} perPage={numPer} send={send} setSendHandler={setSendHandler} /></div>}
            {pages > 1 && !props.close && page > 1 && <input type="button" className="pagesBackw" id="us" value="<" onClick={page === 1 ? null : backButton}></input>}
            {pages > 1 && !props.close && <label className="pages" id="us">{page + " / " + pages}</label>}
            {pages > 1 && !props.close && page < pages && <input type="button" className="pagesForw" id="us" value=">" onClick={page === pages ? null : nextButton}></input>}
            {!props.close && <input type="text" onChange={searchChange} id="searchUsers" value={search} className="searchUser" ></input>}
            {!props.close && <label htmlFor="searchUsers" class="searchUserL">Search Users</label>}
            {!props.close && <input type="button" className="userSend" id="us" value="Absenden" onClick={setSendHandler}></input>}
            {!props.close &&
                <div className="flex-center-div">
                    <div className="allUsersTA">Alle Nutzer auf dieser Seite aktivieren
                        <input type="checkbox" className="allUsersChkbA" id="allUsersA" onChange={checkAllUsersA}></input>
                    </div>
                    <br />
                    <div className="allUsersTD">Alle Nutzer auf dieser Seite entfernen
                        <input type="checkbox" className="allUsersChkbD" id="allUsersD" onChange={checkAllUsersD}></input>
                    </div>
                </div>}
        </div>
    )
}

export default UserC