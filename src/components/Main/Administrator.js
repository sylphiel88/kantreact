import React, { useState, useEffect } from "react"
import SpeiseplanPanel from "./SpeiseplanPanel"
import UserC from "./UserC"

function Administrator({ props }) {
    const [curPage, setCurPage] = useState(0)
    const [closingState, setClosingState] = useState(false)

    useEffect(()=>{
        if(curPage>0){
            setClosingState(true)
            var id = "s" + curPage;
            document.getElementById(id).classList.add("flex-center-div");
            setTimeout(()=>{var spalte = "spalte"+curPage;var id = "s" + curPage;document.getElementById(id).classList.replace(spalte,"spalte_big");document.getElementById(id).classList.remove("flex-center-div");setClosingState(false)},1000)
        }
    },[curPage])

    const closeHandler = async () => {
        var id = "s" + curPage;
        var anim = "spalte_anim" + curPage;
        document.getElementById(id).classList.replace("spalte_anim",anim);
        if(curPage===1){
            document.getElementById("us").classList.replace("userSend","userSend2");
        }
        setClosingState(true)
        setTimeout(() => {setCurPage(0);setClosingState(false)}, 1001);
    }

    return (
        <div>
            <div className="zeile" style={{ marginTop: "5vh" }}>
                <div id="s1" className={curPage === 1 ? "spalte1 spalte_anim" : "spalte1"} onClick={() => setCurPage(1)}>{curPage===1?<UserC close={closingState}/>:"User-Kontrollzentrum"}</div>
                <div id="s2" className={curPage === 2 ? "spalte2 spalte_anim" : "spalte2"} onClick={() => setCurPage(2)}>{curPage===2?<SpeiseplanPanel close={closingState}/>:"Speiseplan"}</div>
                <div id="s3" className={curPage === 3 ? "spalte3 spalte_anim" : "spalte3"} onClick={() => setCurPage(3)}>c</div>
            </div>
            <div className="zeile">
                <div id="s4" className={curPage === 4 ? "spalte4 spalte_anim" : "spalte4"} onClick={() => setCurPage(4)}>d</div>
                <div id="s5" className={curPage === 5 ? "spalte5 spalte_anim" : "spalte5"} onClick={() => setCurPage(5)}>e</div>
                <div id="s6" className={curPage === 6 ? "spalte6 spalte_anim" : "spalte6"} onClick={() => setCurPage(6)}>f</div>
            </div>
            {curPage != 0 && !closingState ? <div class="close" onClick={() => closeHandler()}>X</div> : ""}
        </div>
    )
}

export default Administrator