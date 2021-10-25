import React from 'react'

function UserCard(props) {
    var cardClass = "card cardUL carduser"+props.perPage
    var fs = props.perPage<20?15:12
    function changeHandlerA(){
        if(document.getElementById(props.username+"akt").checked==true){
            document.getElementById(props.username+"rem").checked=false
        }
    }
    function changeHandlerD(){
        if(document.getElementById(props.username+"rem").checked==true){
            document.getElementById(props.username+"akt").checked=false
        }
    }
    return (
        <div className={cardClass}>
            <div className="card-divider carduserT">{props.username} nicht aktiviert!</div>
            <div className="card-section card-sectionUL cardscchkuser">
                <div className="chkuser">
                    <input className={props.perPage<16?"chkuser2":"chkuser2 chkuser2_20 text20"} id={props.username+"akt"} type="checkbox" onChange={changeHandlerA}></input>
                    <label htmlFor={props.username+"akt"} style={{color:"#FFFBE0", fontSize:fs}} className={props.perPage>=16?"text20":""}>Nutzer aktivieren</label><br/>
                    <input className={props.perPage<16?"chkuser3":"chkuser3 chkuser3_20 text20"} id={props.username+"rem"} type="checkbox" onChange={changeHandlerD}></input>
                    <label htmlFor={props.username+"rem"} style={{color:"#FFFBE0", fontSize:fs}} className={props.perPage>=16?"text20":""}>Nutzer entfernen</label>
                </div>
            </div>
        </div>
    )
}

export default UserCard
