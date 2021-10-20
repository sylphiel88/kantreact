import React, { useState, useEffect } from 'react'
import axios from 'axios'
import UserCard from './UserCard';
import InformationModal from '../InformationModal';
function UserList(props) {
    const [datar, dataChg] = useState(props.data)
    const [cardList, setCardList] = useState([])
    const [page, setPage] = useState(1)
    const [modalOpen, setModalOpen] = useState(false)
    const [modalText, setModalText] = useState("")
    const [chkdList, chkdListChg] = useState([])

    if (props.page != page) {
        setPage(props.page)
    }

    if (datar != props.data) {
        dataChg(props.data)
    }

    useEffect(() => {
        const listItems = datar.map((user) =>
            <UserCard username={user.username} perPage={props.perPage}/>
        );
        setCardList(listItems)
    }, [datar])

    function modalOpenHandler() {
        setModalOpen(!modalOpen)
    }

    if (props.send) {
        let userlist = []
        let numAct = 0
        Array.from(document.getElementsByClassName("chkuser2")).forEach(function (card) {
            if (card.checked) {
                numAct += 1
                var un = card.id
                userlist.push(un)
                axios({
                    method: 'post',
                    url: 'http://localhost:5000/api/v1/user/activateUser',
                    headers: {},
                    data: {
                        username: un
                    }
                })
            }
            if (numAct > 0) {
                let modText = "Nutzer "
                if (numAct == 1) {
                    modText+=userlist[0]+" "
                } else {
                    userlist.forEach(function (userInL) {
                        modText += userInL + ", "
                    })
                    modText = modText.substr(0, modText.length-2)+" "
                }
                modText+=numAct>1?"wurden aktiviert!":"wurde aktiviert!";
                setModalText(modText)
                modalOpenHandler()
            }
            card.checked = false
            props.setSendHandler();
        }
        )
    }

    return <div>{modalOpen && <InformationModal open={modalOpen} openHandler={modalOpenHandler} text={modalText} />}{cardList}</div>
}


export default UserList