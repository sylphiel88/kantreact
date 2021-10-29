import React, { useState, useEffect } from 'react'
import axios from 'axios'
import UserCard from './UserCard';
import InformationModal from '../../InformationModal';
function UserList(props) {
    const [datar, dataChg] = useState(props.data)
    const [cardList, setCardList] = useState([])
    const [page, setPage] = useState(1)
    const [modalOpen, setModalOpen] = useState(false)
    const [modalOpenN, setModalOpenN] = useState(false)
    const [modalText, setModalText] = useState("")

    if (props.page != page) {
        setPage(props.page)
    }

    if (datar != props.data) {
        dataChg(props.data)
    }

    useEffect(() => {
        setModalOpen(false)
        setModalOpenN(false)
        var listItems = []
        console.log(datar);
        if (datar.length != 0) {
            listItems = datar.map((user) =>
                <UserCard username={user.username} perPage={props.perPage} />
            );
            setCardList(listItems)
        } else {
            setCardList([])
            modalOpenHandlerN();
        }
    }, [datar])

    async function modalOpenHandler() {
        setModalOpen(!modalOpen)
    }

    function modalOpenHandlerN() {
        setModalOpenN(!modalOpenN)
    }


    if (props.send) {
        let userlistA = []
        let userlistD = []
        let numAct = 0
        let numDel = 0
        let modText = ""
        Array.from(document.getElementsByClassName("chkuser2")).forEach(function (cardA) {
            if (cardA.checked) {
                numAct += 1
                var unA = cardA.id.substr(0, cardA.id.length - 3)
                userlistA.push(unA)
                axios({
                    method: 'post',
                    url: 'http://localhost:5000/api/v1/user/activateUser',
                    headers: {},
                    data: {
                        username: unA
                    }
                })
            }
            cardA.checked = false
        })
        if (numAct > 0) {
            modText = "Nutzer "
            if (numAct == 1) {
                modText += userlistA[0] + " "
            } else {
                userlistA.forEach(function (userInLA) {
                    modText += userInLA + ", "
                })
                modText = modText.substr(0, modText.length - 2) + " "
            }
            modText += numAct > 1 ? "wurden aktiviert!" : "wurde aktiviert!";
        }
        Array.from(document.getElementsByClassName("chkuser3")).forEach(function (cardD) {
            if (cardD.checked) {
                numDel += 1
                var unD = cardD.id.substr(0, cardD.id.length - 3)
                userlistD.push(unD)
                axios({
                    method: 'post',
                    url: 'http://localhost:5000/api/v1/user/deleteUser',
                    headers: {},
                    data: {
                        username: unD
                    }
                })
            }
            cardD.checked = false;
        })
        if (numDel > 0) {
            modText += numAct > 0 ? " | " : ""
            modText += "Nutzer "
            if (numDel == 1) {
                modText += userlistD[0] + " "
            } else {
                userlistD.forEach(function (userInLD) {
                    modText += userInLD + ", "
                })
                modText = modText.substr(0, modText.length - 2) + " "
            }
            modText += numDel > 1 ? "wurden entfernt!" : "wurde entfernt!";
        }
        if (numAct > 0 || numDel > 0) {
            props.setSendHandler();
            setModalText(modText)
            modalOpenHandler()
        }
    }

    return (
        <div className="userlistMarg">
            {modalOpen && <InformationModal open={modalOpen} openHandler={modalOpenHandler} text={modalText} />}
            {modalOpenN && <InformationModal open={modalOpenN} openHandler={modalOpenHandlerN} text="Keine Nutzer gefunden!" />}
            {cardList}
        </div>)
}


export default UserList