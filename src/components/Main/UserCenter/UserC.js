import React, { useState, useEffect } from "react"
import axios from "axios"
import UserList from "./UserList"
import PerPageSelector from "./PerPageSelector"
import PaginatorUser from "./PaginatorUser"
import SearchField from "./SearchField"
import CheckBoxWrapper from "./CheckBoxWrapper"
import ActivateCheckbox from "./ActivateCheckbox"
import DeleteCheckbox from "./DeleteCheckbox"
import SendButton from "./SendButton"

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
                <div>
                    <PerPageSelector chgSelectHandler={chgSelectHandler} />
                    {pages > 1 &&
                        <PaginatorUser page={page} pages={pages} backButton={backButton} nextButton={nextButton} />}
                    <SearchField search={search} searchChange={searchChange} />
                    <div className="userlist"><UserList data={data} page={page} perPage={numPer} send={send} setSendHandler={setSendHandler} /></div>
                    <CheckBoxWrapper>
                        <ActivateCheckbox checkAllUsersA={checkAllUsersA}/>
                        <br />
                        <DeleteCheckbox checkAllUsersD={checkAllUsersD}/>
                    </CheckBoxWrapper>
                    <SendButton setSendHandler={setSendHandler}/>
                </div>}
        </div>
    )
}

export default UserC