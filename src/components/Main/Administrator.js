import React, { useState, useEffect } from "react"

function Administrator({props}){
    const [curPage, setCurrPage] = useState(0)
    return(
        <div>
            <div className="zeile" style={{marginTop: "5vh"}}>
                <div className={curPage===1?"spalte1 spalte_anim":"spalte1"} onClick={() => setCurrPage(1)}>User-Kontrollzentrum</div>
                <div className={curPage===2?"spalte2 spalte_anim":"spalte2"} onClick={() => setCurrPage(2)}>b</div>
                <div className={curPage===3?"spalte3 spalte_anim":"spalte3"} onClick={() => setCurrPage(3)}>c</div>
            </div>
            <div className="zeile">
                <div className={curPage===4?"spalte4 spalte_anim":"spalte4"} onClick={() => setCurrPage(4)}>d</div>
                <div className={curPage===5?"spalte5 spalte_anim":"spalte5"} onClick={() => setCurrPage(5)}>e</div>
                <div className={curPage===6?"spalte6 spalte_anim":"spalte6"} onClick={() => setCurrPage(6)}>f</div>
            </div>
            {curPage!=0?<div class="close" onClick={() => setCurrPage(0)}>X</div>:""}
        </div>
    )
}

export default Administrator