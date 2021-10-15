import React, { useState, useEffect } from "react"
import axios from "axios"

function UserC({ props }) {

    const [datar, dataChg] = useState([])
    const [page, chgPage] = useState(1)
    const [numPer, chgNumPer] = useState(9)
    const [pages, setPages] = useState(1)

    useEffect(async ()=>{
        let getStr='http://localhost:5000/api/v1/user/notactivatedusers?page='+page+'&perPage='+numPer;
        console.log(getStr);
        axios.get(getStr,{headers: { 'content-type': 'application/json' }})
            .then(response =>dataChg(response.data))
        axios.get('http://localhost:5000/api/v1/user/getCountUsers?perPage='+numPer,{headers: { 'content-type': 'application/json' }})
            .then(response =>setPages(response.data.pages))
    },[])

    function UserList(props){
        const listItems = datar.map((user)=>
            <div className="card carduser"><div className="card-divider carduserT">{user.username} not activated!</div><div className="card-section\"><input className="chkuser2" id={user.username} type="checkbox"></input><label className="chkuser" for={user.username}>Activate</label></div></div>
        )
        return <div>{listItems}</div>
    }
    return(
        <div>
            <UserList/>
            <input type="button" class="userSend" id="us" value="Absenden"></input>
        </div>
    )
}

export default UserC