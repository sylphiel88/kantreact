import React from 'react'

function UserCard(props) {
    var cardClass = "card carduser"+props.perPage

    return (
        <div className={cardClass}>
            <div className="card-divider carduserT">{props.username} nicht aktiviert!</div>
            <div className="card-section chkuser">
                <div className="chkuser">
                    <input className="chkuser2" id={props.username} type="checkbox"></input>
                    <label htmlFor={props.username} style={{color:"#FFFBE0", fontSize:"15pt"}}>Nutzer aktivieren</label>
                </div>
            </div>
        </div>
    )
}

export default UserCard
